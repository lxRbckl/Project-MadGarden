FROM node:19.5.0


# referencing docker compose <
ENV publishBranch 'main'
ENV publishFile 'README.md'
ENV publishRepository 'lxRbckl'
ENV publishSource 'https://github.com/lxRbckl/lxRbckl/tree/main'

ENV octokitOwner 'lxRbckl'
ENV octokitToken ''
ENV octokitExcludedBranches ' '

ENV urlGitHubUsers 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/V2/src/data/githubUsers.json'
ENV urlElementResources 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementResources.json'
ENV urlElementDescriptions 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementDescription.json'

# >


WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm build


CMD ["node", "app/dist/app.js"]