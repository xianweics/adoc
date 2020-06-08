import React from 'react';
import src from '../office365.png';
import request from "./request";

export default class rootComponent extends React.Component {
  state = {
    goodsList: [],
    activeId: 0,
    name: '',
    total: 0
  };
  
  componentDidCatch (error, errorInfo) {
    console.info(error, errorInfo);
  }
  
  changName = (e) => {
    e.persist();
    this.setState({
      name: e.target.value
    });
  };
  
  changeTotal = (e) => {
    e.persist();
    this.setState({
      total: e.target.value
    });
  };
  getGoods = async () => {
    const goodsList = await request.get('goods');
    this.setState({
      goodsList,
      activeId: 0
    });
  };
  delGoods = async () => {
    await request.delete(`goods/${this.state.activeId}`);
    this.getGoods();
  };
  addGoods = async () => {
    const { name, total } = this.state;
    await request.post('goods', {
      name,
      total
    });
    this.getGoods();
  };
  
  renderTableBody = () => {
    const { goodsList, activeId } = this.state;
    if (goodsList.length > 0) {
      return goodsList.map((goods, index) => {
        const { id, name, total, rest } = goods;
        return <tr key={index} onClick={() => this.changeActiveId(id)} className={activeId === id? 'active': ''}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{total}</td>
          <td>{rest}</td>
        </tr>;
      });
    } else {
      return <tr>
        <td colSpan="4">Not data</td>
      </tr>;
    }
  };
  
  changeActiveId = (id) => {
    this.setState({
      activeId: id
    });
  };
  
  render () {
    const { name, total, activeId } = this.state;
    return (
      <div className="content">
        <h1>Hello React 16 spa</h1>
        <div><img src={src} width="100px"/></div>
        <a href="/vue-spa">from vue to vue</a>
        <div className="input-group">
          Name: <input type="text" value={name} onChange={this.changName}/>
          Total: <input type="text" value={total} onChange={this.changeTotal}/>
        </div>
        <div className="btn-group">
          <button onClick={this.getGoods}>Get goods list</button>
          <button onClick={this.delGoods} disabled={activeId === 0}>Delete goods</button>
          <button onClick={this.addGoods}>Add goods</button>
        </div>
        <table className="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Total</th>
            <th>Rest</th>
          </tr>
          </thead>
          <tbody>
          {this.renderTableBody()}
          </tbody>
        </table>
      </div>
    );
  }
}
