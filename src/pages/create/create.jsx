import React from 'react';

import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import ArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';

import { observer, inject } from 'mobx-react';

import CustomAppBar from '../../components/custom-app-bar';
import NavigationController from '../../controllers/navigation-controller';

import FirstStep from './first-step';
import SecondStep from './second-step';
import ThirdStep from './third-step';
import SelectCardStep from './select-card-step';

import styles from './styles';

@withStyles(styles)
@inject(({ createStore, cardsStore }) => ({
    createStore,
    cardsStore
}))
@observer
class Main extends React.Component {
    state = {
        checked: [0],
        activeStep: 0
    };

    constructor(props) {
        super(props);
        this.steps = [SelectCardStep, FirstStep, SecondStep, ThirdStep];
    }

    render() {
        return (
            <div className={ this.props.classes.createStore }>
                { this.renderCustomAppBar() }
                { this.renderSteps() }
                { this.renderStepper() }
            </div>
        );
    }

    renderCustomAppBar() {
        return (
            <CustomAppBar
                leftAddon={ <ArrowLeftIcon onClick={ () => { this.props.history.goBack();} } /> }
                title='Создать лимит'
            />
        );
    }

    renderStepper() {
        const nextButtonText = this.state.activeStep === 2
            ? 'Готово'
            : 'Далее';
        return (
            <MobileStepper
                type='text'
                steps={ 3 }
                position='bottom'
                activeStep={ this.state.activeStep }
                onBack={ this.handleBack }
                onNext={ this.handleNext }
                nextButtonText={ nextButtonText }
                backButtonText={ 'Назад' }
                disableBack={ this.state.activeStep === 0 }
                disableNext={ !this.props.createStore.isValid(this.state.activeStep) }
            />
        );
    }

    renderSteps() {
        return this.steps.map((Component, index) => (
            <div
                key={ index }
                className={ this.state.activeStep !== index && this.props.classes.hidden }
            >
                <Component />
            </div>
        ));
    }


    handleNext = () => {
        if (this.state.activeStep === this.steps.length - 1) {
            this.props.createStore.save().then(() => {
                NavigationController.toMainScreen();
            });
        } else {
            this.setState({
                activeStep: this.state.activeStep + 1
            });
        }
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        });
    };
}

export default Main;
