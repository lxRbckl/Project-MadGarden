FROM node:19.5.0


# referencing docker compose <
ENV bigBreaker ${bigBreaker}
ENV smallBreaker ${smallBreaker}
ENV splitDelimeter ${splitDelimeter}
ENV urlElementResources ${urlElementResources}
ENV urlElementDescriptions ${urlElementDescriptions}

ENV file ${file}
ENV owner ${owner}
ENV token ${token}
ENV branch ${branch}
ENV source ${source}
ENV repository ${repository}
ENV urlGitHubUsers ${urlGitHubUsers}
ENV excludedBranches ${excludedBranches}

# >


WORKDIR /app
COPY . .
RUN npm install


CMD ["node", "app/dist/app.js"]