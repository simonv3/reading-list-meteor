Settings = React.createClass({

  getInitialState() {
    return {
      open: false,
    }
  },

  toggleSettings() {
    this.setState({
      open: !this.state.open
    })
  },

  render() {

    const open = classNames({'open': this.state.open})

    return (
        <div className={open + " settings"}>
          <a className="fa fa-cog" onClick={this.toggleSettings}></a>
        </div>
      )
  }
});
