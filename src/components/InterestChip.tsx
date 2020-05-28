import React, { MouseEvent } from 'react';
import { IonChip, IonLabel, IonIcon } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';

interface InterestChipProps {
  interest: string,
  clickFunc: (e: MouseEvent<HTMLIonChipElement>) => void,
  removeBtn: boolean
  removeBtnFunc?: (e: MouseEvent<HTMLIonIconElement>) => void,

}

export class InterestChip extends React.Component<InterestChipProps> {
  static defaultProps = {
    clickFunc: () => {},
    removeBtn: false
  };

  render() {
    return (
      <IonChip onClick={this.props.clickFunc}>
        <IonLabel>{this.props.interest}</IonLabel>
        {this.props.removeBtn &&
          <IonIcon icon={closeCircle} onClick={this.props.removeBtnFunc!}/>
        }
      </IonChip>
    );
  }
}