import fs from 'fs'
import path from 'path'
import * as yaml from 'js-yaml';

export function saveInfo(contractName: string, network: string, contractAddress: string): void {
    const logs: any = []
    logs.push(`${contractName}: "${contractAddress}"`)
    try {
      const outputDir = path.join(__dirname, `/../deployed/${network}`)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {recursive: true})
      }
      fs.writeFileSync(path.join(outputDir, `${contractName}.yml`), logs.join('\n'))
      fs.appendFileSync(path.join(outputDir, `${contractName}.yml`), '\n')
    } catch (err) {
      console.error(err)
    }
}

export function readYaml(contractName: string, network: string): string {
  // Generate an absolute path to the YAML file
  const yamlFilePath = path.join(__dirname, `/../deployed/${network}/${contractName}.yml`);

  try {
    // Read the YAML file synchronously
    const data = fs.readFileSync(yamlFilePath, 'utf8');
  
    // Parse the YAML content
    const parsedYaml = yaml.load(data) as Record<string, string>;
    
    // Extract the value corresponding to the key
    const contractAddress = parsedYaml?.[contractName];
    
    if (contractAddress) {
      console.log(`${contractName} address is: ${contractAddress}`);
      return contractAddress;
    } else {
      console.error(`${contractName} key not found in the YAML file`);
      return "";
    }

  } catch (err) {
    console.error('Error reading the file:', err);
    return "";
  }
}