import React, { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {
  //definir item default
  // static defaultProps = {
  //   tech: 'Oculta'
  // };

  state = {
    newTech: '',
    techs: []
  };

  //quando inicializa é executado
  componentDidMount() {
    const techs = localStorage.getItem('techs');
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
    // this.setState({ techs: ['React', 'NodeJS', 'Ruby'] });
  }

  //quando o state ou as props altera é executado
  //prevProps
  componentDidUpdate(_, prevState) {
    // if (prevProps !== this.props) {
    //   console.log('mudou');
    // }
    if (prevState.techs !== this.state.techs) {
      console.log('mudou');
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ techs: [...this.state.techs, this.state.newTech], newTech: '' });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Tech: {this.state.newTech}</h1>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem key={tech} tech={tech} onDelete={() => this.handleDelete(tech)} />
          ))}
          {/* <TechItem /> //este item trata erro quando vc esquece uma propriedad obigatoria */}
        </ul>
        <input type="text" onChange={this.handleInputChange} value={this.state.newTech} />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}
export default TechList;
