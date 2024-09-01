const markdownManagerConfig: {

   bigBreaker: string,
   smallBreaker: string,
   splitDelimeter: string,
   splitTargetIndex: number,
   splitExpectedSize: number,
   urlElementResources: string,
   urlElementDescriptions: string,
   propertyRegexes : {'subject': RegExp, 'topic': RegExp}

} = {

   bigBreaker : process.env.bigBreaker!,
   smallBreaker : process.env.smallBreaker!,
   splitDelimeter : process.env.splitDelimeter!,
   urlElementResources : process.env.urlElementResources!,
   urlElementDescriptions : process.env.urlElementDescriptions!,

   splitTargetIndex : 1,
   splitExpectedSize : 3,
   propertyRegexes : {'subject' : /\[\*\*`([^`]*)`\*\*\]/, 'topic' : /\[`([^`]*)`\]/}

}

// export <
export default markdownManagerConfig;

// >