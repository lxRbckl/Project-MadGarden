FROM node:19.5.0


# referencing docker compose, otherwise override <
ENV tokenOctokit ${tokenOctokit}

ENV file ${file}
ENV tree ${tree}
ENV owner ${owner}
ENV branch ${branch}
ENV repository ${repository}
ENV urlGitHubUsers ${urlGitHubUsers}
ENV excludedBranches ${excludedBranches}

ENV urlElementResources ${urlElementResources}
ENV urlElementDescriptions ${urlElementDescriptions}

# >


WORKDIR /app
COPY . .
RUN npm install


CMD ["node", "dist/app.js"]