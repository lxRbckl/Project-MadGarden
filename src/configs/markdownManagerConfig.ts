const markdownManagerConfig: {

   splitDelimeter: string,
   splitTargetIndex: number,
   splitExpectedSize: number,
   urlElementResources: string,
   urlElementDescriptions: string,
   propertyRegexes : {'topic': RegExp, 'subject': RegExp}

} = {

   splitTargetIndex : 1,
   splitDelimeter : '\n',
   splitExpectedSize : 3,
   propertyRegexes : {'topic' : /\[`([^`]*)`\]/, 'subject' : /\[\*\*`([^`]*)`\*\*\]/},
   urlElementResources : 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementResources.json',
   urlElementDescriptions : 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementDescription.json'

}

// export <
export default markdownManagerConfig;

// >