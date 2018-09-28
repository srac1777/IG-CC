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
        this.handleReset = this.handleReset.bind(this);
    }

    updateTime() {
        let timeLeft = this.state.time - 1;
        if(timeLeft === 0){
            clearInterval(this.intervalId);
        }
        // timeLeft = timeLeft <= 0 ? 0 : timeLeft;
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

    handleReset(e) {
        e.preventDefault();
        if (this.intervalId) clearInterval(this.intervalId);
        this.setState({ time: '', value: '' });
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
            to_return = (<div>Enter a time!</div>);
        } 
        else if (this.state.time < 0){
            to_return = (<div>Invalid input</div>);
        } else {
            to_return = (<div>Countdown Complete!</div>); 
        }

        return (
            <div className= "full-clock">
                <div className="title-box">
                    Countdown Clock
                    <div className="me-text">
                    by &nbsp;
                        <a href="https://shashankracherla.com" className="me-tag">Shashank Racherla</a>
                    </div>
                </div>
                <div className="input-body-box">
                    <div>Enter the time to countdown (minutes):
                        <span>
                            <input type="number" value={this.state.value} onChange={this.handleChange} className="number-input"/>
                        </span>
                    </div>
                    <div>
                        <input type="submit" value="Start" onClick={this.handleSubmit} className="start-button"/>
                        
                    </div>
                </div>
                <div className="countdown-box">
                    <div className="time-remaining">
                        Time Remaining:
                        
                    </div>
                    <div className="countdown-main">
                        {/* {this.state.time} */}
                        {to_return}
                    </div>
                    <div>
                        <input type="submit" value="Reset" onClick={this.handleReset} className="reset-button" />
                    </div>
                </div>
            </div>
        );
    }
};