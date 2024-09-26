package impl

import (
	"bytes"
	"context"
	"fmt"
	"image"
	"image/jpeg"
	"io"
	"log"
	"strings"

	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blockblob"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/container"
	"github.com/gofiber/fiber/v2"
	"github.com/nfnt/resize"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/drive/v3"
	"google.golang.org/api/option"

	"app/lib/config"
	"app/lib/utils"
)

func GetBlobClient() (*azblob.Client, error) {
	azureAccountKey := config.Get("blob_acc_key")
	blobServiceURL := config.Get("blob_service_url")

	credential, err := azblob.NewSharedKeyCredential("exessblob", azureAccountKey)
	if err != nil {
		log.Printf("Failed to create Azure credentials: %v", err)
	}

	client, err := azblob.NewClientWithSharedKeyCredential(blobServiceURL, credential, nil)
	if err != nil {
		log.Printf("Failed to create Azure Blob service client: %v", err)
	}
	return client, nil
}

type Blob struct {
	Name   string `json:"name"`
	Width  string `json:"width"`
	Height string `json:"height"`
}

func GetBlobMeta(c *fiber.Ctx) error {
	container := c.Params("container")
	folder := c.Query("folder")
	if container == "" {
		return utils.Error(400, "No container/path provided")
	}
	client, err := GetBlobClient()
	if err != nil {
		return utils.Error(500, "Unable to create blob", err)
	}

	pager := client.NewListBlobsFlatPager(container, &azblob.ListBlobsFlatOptions{
		Prefix: &folder,
		Include: azblob.ListBlobsInclude{
			Metadata: true,
		},
	})

	blobs := []Blob{}
	for pager.More() {
		resp, err := pager.NextPage(c.Context())
		if err != nil {
			fmt.Println(err)
		}

		for _, blob := range resp.Segment.BlobItems {
			// Print the blob metadata
			m := make(map[string]string)
			for k, v := range blob.Metadata {
				m[k] = *v
			}
			fmt.Println(m)
			b := Blob{
				Name:   fmt.Sprintf("%s%s/%s", client.URL(), container, *blob.Name),
				Width:  m["width"],
				Height: m["height"],
			}
			blobs = append(blobs, b)
		}
	}

	return c.JSON(blobs)
}
func Migrate(c *fiber.Ctx) error {
	ImportPhotos()
	return nil
}
func GetContainers(c *fiber.Ctx) error {
	client, err := GetBlobClient()
	if err != nil {
		return utils.Error(500, "Unable to create blob", err)
	}

	pager := client.NewListContainersPager(&azblob.ListContainersOptions{})

	containers := []string{}
	for pager.More() {
		resp, err := pager.NextPage(c.Context())
		if err != nil {
			fmt.Println("Error: ", err)
		}

		for _, container := range resp.ListContainersSegmentResponse.ContainerItems {
			containers = append(containers, *container.Name)
		}
	}
	return c.JSON(containers)
}
func ImportPhotos() {
	ctx := context.Background()

	client, err := google.DefaultClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create Google Drive client: %v", err)
	}

	driveService, err := drive.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		log.Fatalf("Failed to create Drive service: %v", err)
	}

	// Authenticate with Azure Blob Storage using azidentity
	azureAccountKey := config.Get("blob_acc_key")
	blobServiceURL := config.Get("blob_service_url")
	credential, err := azblob.NewSharedKeyCredential("exessblob", azureAccountKey)
	if err != nil {
		log.Fatalf("Failed to create Azure credentials: %v", err)
	}

	blobClient, err := azblob.NewClientWithSharedKeyCredential(blobServiceURL, credential, nil)
	if err != nil {
		log.Fatalf("Failed to create Azure Blob service client: %v", err)
	}

	var createFilesInFolder func(string, string) error

	convert := func(s string) string {
		fmtted := strings.ToLower(strings.ReplaceAll(s, "-", ""))
		return fmtted
	}

	accessType := azblob.PublicAccessTypeContainer
	// Create a container (folder) in Azure Blob Storage
	_, err = blobClient.CreateContainer(ctx, "public", &container.CreateOptions{
		Access: &accessType,
	})
	if err != nil {
		utils.Error(fiber.StatusConflict, "Container already exists", err)
	}
	// Recursive function to create containers and upload files based on Google Drive folder structure
	createFilesInFolder = func(folderId string, parentPath string) error {
		query := fmt.Sprintf("'%s' in parents", folderId)
		fileList, err := driveService.Files.List().Q(query).Fields("files(id, name, mimeType)").Do()
		if err != nil {
			return fmt.Errorf("failed to list files: %v", err)
		}

		for _, file := range fileList.Files {
			if file.MimeType == "application/vnd.google-apps.folder" {
				var path string
				if parentPath != "" {
					path = fmt.Sprintf("%s/%s", parentPath, convert(file.Name))
				} else {
					path = convert(file.Name)
				}
				// Recursively create containers and upload files for sub-folders
				err = createFilesInFolder(file.Id, path)
				if err != nil {
					return err
				}
			} else if strings.Contains(file.MimeType, "image") {
				// Download the file from Google Drive
				fileContent, err := driveService.Files.Get(file.Id).Download()
				if err != nil {
					log.Printf("Failed to download file %s: %v", file.Name, err)
					continue
				}
				defer fileContent.Body.Close()

				fileName := convert(file.Name)
				variants, err := CreateVariants(fileContent.Body, fmt.Sprintf("%s.%s", fileName, file.FileExtension), map[string]float32{
					"blur": 0.1,
					"sm":   0.3,
					"full": 1,
				})
				if err != nil {
					return err
				}

				fmt.Println("Creating variants for ", fileName)
				for _, variant := range variants {
					// name := fmt.Sprintf("%s/%s", parentPath, fmt.Sprintf("/%s/%s.%s", variant.Name, file.Name, file.FileExtension))
					name := utils.Fmt("{{.parent}}/{{.variant}}", map[string]string{
						"parent":  parentPath,
						"variant": variant.Name,
					})
					_, err = blobClient.UploadStream(ctx, "public", name, &variant.Bytes, &blockblob.UploadStreamOptions{
						Metadata: map[string]*string{
							"Width":  &variant.Meta.Width,
							"Height": &variant.Meta.Height,
						},
					})
					if err != nil {
						log.Printf("Failed to upload file %s to Azure Blob Storage: %v", file.Name, err)
						continue
					}
				}

				fmt.Printf("Successfully uploaded file: %s\n", fileName)
			}
		}

		return nil
	}

	// Define the root folder ID and query to list files in the specified folder
	rootFolderID := "13hBlAuxcZaz3HMIyr7iRKvqDuYsRVh0Z"
	// Start creating containers and uploading files from the root folder
	err = createFilesInFolder(rootFolderID, "")
	if err != nil {
		log.Printf("Failed to create containers and upload files: %v", err)
	}

	fmt.Println("Containers created and files uploaded successfully based on Google Drive folder structure.")
}

type BlobMeta struct {
	Width  string
	Height string
}
type BlobInsert struct {
	Name  string
	Bytes bytes.Buffer
	Meta  BlobMeta
}

func CreateVariants(content io.ReadCloser, name string, percents map[string]float32) ([]BlobInsert, error) {
	var blobs []BlobInsert
	image, _, err := image.Decode(content)
	if err != nil {
		return nil, err
	}
	size := image.Bounds().Size()

	for k, v := range percents {
		version := resize.Resize(
			uint(float32(size.X)*float32(v)),
			uint(float32(size.Y)*float32(v)),
			image,
			resize.Lanczos3,
		)
		bytes := new(bytes.Buffer)
		jpeg.Encode(bytes, version, nil)

		vsize := version.Bounds().Size()
		n := fmt.Sprintf("%s/%s", k, name)
		blobs = append(blobs, BlobInsert{
			Bytes: *bytes,
			Name:  n,
			Meta: BlobMeta{
				Width:  fmt.Sprintf("%d", vsize.X),
				Height: fmt.Sprintf("%d", vsize.Y),
			},
		})
	}

	return blobs, nil
}
