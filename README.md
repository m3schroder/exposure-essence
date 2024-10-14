# Exposure Essence


## Overview 

This is a mono repo that houses all of the work for my photography client Exposure Essence. Their site is a WIP but they've given me permission to make this stage of their code public. 
 
The project includes a Golang API, a Next.js frontend, and infrastructure provision via the Azurerm provider in Terraform. I've opted for using HCP Cloud so that I can run my infrastructure asynchronously, and so that when this freelance business grows my foundation can grow with it. 

The Golang API isn't doing much at the moment but will play with my primary server at api.strukt.io. This server provides means for ingesting the client's current photos from Google Drive and into an Azure Blob container in 3 different sizes. These sizes are used for loading states and full resolution versions of the ingested photos. Admittedly this part is a little ad hoc, since after it's done once it won't need to be done again. I'd like to abstract it into my primary server at api.strukt.io so that I can do the same for any other potential clients. The only other function this has at the moment is to create new contacts in the database. 

The API is designed such that the routing, route handling, and implementation are al handled seperately. This makes it more composable / scalable in the long term.


## CI/CD

The API and frontend are deployed to Azure App Service via the terraform provider. I have the Terraform made to setup mailing and domain DNS but since this isn't live yet I don't have it running. 

The various environment variables needed are output into the repositories environment variables / secrets. Depending on the sensitivity of the output. These are then consumed from the github workflow and passed into the Dockerfile as build args. 

Once the Dockefile is built and pushed to the Azure Container Registry the webhook that's on the App Service detects the change and updates the currently running image. 