import React, {Component} from 'react';

export class ImageCite extends Component {

  
  render(){
    let title = "Download free do whatever you want high-resolution photos from " + this.props.name;

    // Embed code from Uplash that I cleaned up
    return (
      <div>
        <a className={this.props.classes} href={this.props.url} target="_blank" rel="noopener noreferrer" title={title}>
          <span className="image-span">{this.props.name}</span>
        </a>
      </div>
    )
  }
}

