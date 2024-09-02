const markdownManagerConfig: {

   bigBreaker: string,
   smallBreaker: string,
   fileDelimeter: string,
   urlElementResources: string,
   urlElementDescriptions: string,
   propertyRegexes : {'subject': RegExp, 'topic': RegExp}

} = {

   bigBreaker : process.env.bigBreaker!,
   smallBreaker : process.env.smallBreaker!,
   fileDelimeter : process.env.fileDelimeter!,
   urlElementResources : process.env.urlElementResources!,
   urlElementDescriptions : process.env.urlElementDescriptions!,

   propertyRegexes : {'subject' : /\[\*\*`([^`]*)`\*\*\]/, 'topic' : /\[`([^`]*)`\]/}

}

// export <
export default markdownManagerConfig;

// >