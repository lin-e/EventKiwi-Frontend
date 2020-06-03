import React, { MouseEvent } from 'react';
import { IonChip, IonLabel, IonIcon } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import { removeProfileInterest } from '../../data/actions/actions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../data/reducers';

interface OwnProps {
  interest: string,
  clickFunc: (e: MouseEvent<HTMLIonChipElement>) => void,
}

const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken
  }
}

export const connector = connect(mapStateToProps, { removeProfileInterest });

type PropsFromRedux = ConnectedProps<typeof connector>

type InterestChipProps = OwnProps & PropsFromRedux

class InterestChip extends React.Component<InterestChipProps> {
  static defaultProps = {
    clickFunc: () => {},
  };

  constructor(props: InterestChipProps) {
    super(props);
    this.removeInterest = this.removeInterest.bind(this);
  }

  removeInterest(e: MouseEvent) {
    e.preventDefault();
    this.props.removeProfileInterest(this.props.interest, this.props.userToken)
  }

  render() {
    return (
      <IonChip onClick={this.props.clickFunc}>
        <IonLabel>{this.props.interest}</IonLabel>
        <IonIcon icon={closeCircle} onClick={this.removeInterest}/>
      </IonChip>
    );
  }
}


export default connector(InterestChip)