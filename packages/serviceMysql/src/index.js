import mysql from 'mysql'

class PoolCluster {
  constructor () {
    this.poolCluster = mysql.createPoolCluster()
    this._instance = null
  }

  static getInstance () {
    if (!PoolCluster._instance) {
      PoolCluster._instance = new PoolCluster()
    }
    return PoolCluster._instance
  }
}

export default PoolCluster
