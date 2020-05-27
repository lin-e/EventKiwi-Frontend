import React, { Component } from 'react';
import { IonText } from '@ionic/react';

interface ExpandTextViewProps {
  text: string,
  limit: number
}

class ExpandTextView extends Component<ExpandTextViewProps> {
   state = { showAll: false }
   showMore = () => this.setState({showAll: true}); 
   showLess = () => this.setState({showAll: false});

   constructor(props: ExpandTextViewProps) {
      super(props);
   }

   render() {   
      
      const limited = this.props.text.substring(0, this.props.limit)+"...";

      return (
         <IonText className="test">
            {this.props.text.length <= this.props.limit && 
               <p>{this.props.text}</p>
            }

            {this.state.showAll &&
                        (<div>
                           <p>{this.props.text}</p>
                           <a onClick={this.showLess}>Read less</a>
                        </div>)}
            
            {!this.state.showAll && this.props.text.length > this.props.limit &&
                  <p>{limited}<span><a onClick={this.showMore}>&nbsp;Read more</a></span></p>
            }
         </IonText>
      )
   }
}

export default ExpandTextView;