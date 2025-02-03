// eslint-disable-next-line no-unused-vars
import {PuzzleCompositeConfig} from "../models/CompositeConfig";
import {ImageFormat} from "./Optimize";

const path = require('path');
const sharp = require('sharp');

export default class Background {
  private readonly filepath : string;

  constructor(filepath : string) {
    this.filepath = filepath;
  }

  public async compositePuzzle(config : PuzzleCompositeConfig) : Promise<Buffer> {
    const bg = await sharp(path.join(this.filepath));

    await bg
      .composite([{
        input: path.join(config.compositeFilepath),
        top: config.top,
        left: config.left,
        blend: "over"
      }]);

    if (config.outputFormat === ImageFormat.PNG) {
      return await bg.png({
        quality: config.outputQuality
      }).toBuffer();
    } else if (config.outputFormat === ImageFormat.JPEG) {
      return await bg.jpeg({
        quality: config.outputQuality
      }).toBuffer();
    }
    
    // Add default return to handle all cases
    throw new Error('Unsupported output format');
  }
}