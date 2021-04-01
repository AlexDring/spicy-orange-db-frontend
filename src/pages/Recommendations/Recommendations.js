import { recommendationColumn } from '../../config/dataSources'
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'

const Recommendations = ({ recommendations }) => {

  return(
    <Table 
    dataSource={recommendations} 
    columns={recommendationColumn} 
    rowKey={result => result.id} 
    rowClassName = 'results-row'
    />
  )
}

export default Recommendations