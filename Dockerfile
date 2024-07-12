FROM node:19.5.0


# referencing docker compose <
ENV splitDelimeter '\n'
ENV bigBreaker '\n\n---\n'
ENV smallBreaker '\n\n# \n'
ENV urlElementResources 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/V1/resources/elementResources.json'
ENV urlElementDescriptions 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/V1/resources/elementDescription.json'

ENV branch 'main'
ENV owner 'lxRbckl'
ENV file 'README.md'
ENV excludedBranches ''
ENV repository 'lxRbckl'
ENV token ''
ENV source 'https://github.com/lxRbckl/lxRbckl/tree/main'
ENV urlGitHubUsers 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/V2/src/data/githubUsers.json'

# >


WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm build


CMD ["node", "app/dist/app.js"]