import React from 'react';

export default class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: '',
            value: ''
        };
        this.updateTime = this.updateTime.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateTime() {
        let timeLeft = this.state.time - 1;
        this.setState({ time: timeLeft });
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ time: this.state.value * 60 - 1}); //value * 60 because input is in minutes
        if(this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(this.updateTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        let to_return = (<div>Loading...</div>)
        if(this.state.time > 0){
            let minutes = Math.floor(this.state.time / 60);
            let seconds = Math.floor(this.state.time) % 60;

            minutes = (minutes < 10) ? `0${minutes}` : minutes;
            seconds = (seconds < 10) ? `0${seconds}` : seconds;

            to_return = `${minutes}:${seconds}`;
        } else if (this.state.time === '') {
            to_return = (<div>Enter your Input above to get started!</div>);
        } 
        else if (this.state.time === 0){
            to_return = (<div>Countdown Complete!</div>);
        } else {
            to_return = (<div>Invalid input</div>);
        }

        return (
            <div>
                <h1>Clock</h1>
                <div>
                    Enter the number of minutes you want to countdown:
                    <input type="number" onChange={this.handleChange}/>
                    <input type="submit" value="Start" onClick={this.handleSubmit}/>
                    
                </div>
                <div>
                    <span>
                        Time Remaining:
                    </span>
                    <span>
                        {/* {this.state.time} */}
                        {to_return}

                    </span>
                </div>
            </div>
        );
    }
};