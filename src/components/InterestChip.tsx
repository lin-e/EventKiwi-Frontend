import React, { MouseEvent } from 'react';
import { IonChip, IonLabel, IonIcon } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../data/actions/types';
import { bindActionCreators } from 'redux';
import { startRemoveProfileInterest } from '../data/actions/actions';
import { connect } from 'react-redux';

interface InterestChipProps {
  interest: string,
  clickFunc: (e: MouseEvent<HTMLIonChipElement>) => void,
  removeBtn: boolean
}

type Props = InterestChipProps & LinkDispatchProps

class InterestChip extends React.Component<Props> {
  static defaultProps = {
    clickFunc: () => {},
    removeBtn: false
  };

  constructor(props: Props) {
    super(props);
    this.removeInterest = this.removeInterest.bind(this);
  }

  removeInterest(e: MouseEvent) {
    e.preventDefault();
    this.props.startRemoveInterest(this.props.interest)
  }

  render() {
    return (
      <IonChip onClick={this.props.clickFunc}>
        <IonLabel>{this.props.interest}</IonLabel>
        {this.props.removeBtn &&
          <IonIcon icon={closeCircle} onClick={this.removeInterest}/>
        }
      </IonChip>
    );
  }
}

interface LinkDispatchProps {
  startRemoveInterest: (toRemove: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  startRemoveInterest: bindActionCreators(startRemoveProfileInterest, dispatch)
})

export default connect(null, mapDispatchToProps)(InterestChip)