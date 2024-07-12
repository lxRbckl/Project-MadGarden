const markdownManagerConfig: {

   bigBreaker: string,
   smallBreaker: string,
   splitDelimeter: string,
   splitTargetIndex: number,
   splitExpectedSize: number,
   urlElementResources: string,
   urlElementDescriptions: string,
   propertyRegexes : {'topic': RegExp, 'subject': RegExp}

} = {

   bigBreaker : '\n\n---\n',
   smallBreaker : '\n\n# \n',
   splitTargetIndex : 1,
   splitDelimeter : '\n',
   splitExpectedSize : 3,
   propertyRegexes : {'topic' : /\[`([^`]*)`\]/, 'subject' : /\[\*\*`([^`]*)`\*\*\]/},
   urlElementResources : 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/V1/resources/elementResources.json',
   urlElementDescriptions : 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/V1/resources/elementDescription.json'

}

// export <
export default markdownManagerConfig;

// >