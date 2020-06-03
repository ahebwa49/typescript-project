import React from 'react';
import logo from './logo.svg';
import './App.css';
import Confirm from './Confirm';
import ConfirmF from './ConfirmF';

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      confirmOpen: false,
      confirmMessage: 'Please hit the confirm button',
      confirmVisible: true,
      countDown: 10,
    };
  }
  private timer: number = 0;

  private handleConfirmClick = () => {
    this.setState({
      confirmOpen: true,
      confirmMessage: 'Cool, carry on reading!',
    });
    clearInterval(this.timer);
  };

  private handleCancelConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Take a break, I'm sure you will later ...",
    });
    clearInterval(this.timer);
  };

  private handleOkConfirmClick = () => {
    this.setState({ confirmOpen: false });
    clearInterval(this.timer);
  };

  private handleTimerTick() {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button ${this.state.countDown} secs to go`,
        countDown: this.state.countDown - 1,
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: 'Too late to confirm!',
            confirmVisible: false,
          });
        }
      }
    );
  }

  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log('getDerivedStateFromProps', props, state);
    return null;
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.confirmMessage}</p>
        {this.state.confirmVisible && (
          <button onClick={this.handleConfirmClick}>Confirm</button>
        )}
        <ConfirmF
          title="React and TypeScript"
          content="Are you sure you want to learn React and TypeScript?"
          cancelCaption="No way"
          okCaption="Yes please!"
          onCancelClick={this.handleCancelConfirmClick}
          onOkClick={this.handleOkConfirmClick}
          open={this.state.confirmOpen}
        />
      </div>
    );
  }
}

export default App;
