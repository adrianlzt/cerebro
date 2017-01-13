class Welcome extends React.Component {
  constructor(props) {
    this.state = {isToggleOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
