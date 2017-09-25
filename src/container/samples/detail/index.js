import React from 'react'
import { connect } from 'react-redux'
import styles from './index.css'
import { Form, Input, Cascader, Button, DatePicker, Select, Switch, Radio, InputNumber } from 'antd'
import moment from 'moment'
import { getFormDetail } from '../../../actions/samples'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}]

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
}

class FormDetail extends React.Component {
  state = {
    confirmDirty: false
  }

  componentWillMount() {
    this.props.dispatch(getFormDetail())
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      const fieldsValue = {
        ...values,
        'birthday': values['birthday'].format('YYYY-MM-DD')
      }
      console.log('SaveData: ', fieldsValue)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { detail } = this.props

    return (
      <Form onSubmit={this.handleSubmit} className={styles['form']}>
        <FormItem
          {...formItemLayout}
          label='E-mail'
          hasFeedback
        >
          {getFieldDecorator('email', {
            initialValue: detail.email,
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Address'
        >
          {getFieldDecorator('address', {
            initialValue: detail.address,
            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
          })(
            <Cascader options={residences} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='BirthDay'
        >
          {getFieldDecorator('birthday', {
            initialValue: moment(detail.birthday, 'YYYY-MM-DD HH:mm:ss'),
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Age'
        >
          {getFieldDecorator('age', { initialValue: detail.age })(
            <InputNumber
              min={0}
              max={100}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Country'
          hasFeedback
        >
          {getFieldDecorator('country', {
            initialValue: detail.country,
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select placeholder='Please select a country'>
              <Option value='china'>China</Option>
              <Option value='use'>U.S.A</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='FavoriteColor'
        >
          {getFieldDecorator('favoriteColor', {
            initialValue: detail.favoriteColor,
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Select mode='multiple' placeholder='Please select favourite colors'>
              <Option value='red'>Red</Option>
              <Option value='green'>Green</Option>
              <Option value='blue'>Blue</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='IsPublic'
        >
          {getFieldDecorator('isPublic', {
            initialValue: detail.isPublic,
            valuePropName: 'checked'
          })(
            <Switch />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Sex'
        >
          {getFieldDecorator('sex', {
            initialValue: detail.sex
          })(
            <RadioGroup>
              <Radio value='man'>男</Radio>
              <Radio value='woman'>女</Radio>
              <Radio value='unkown'>不祥</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>Update</Button>
        </FormItem>
      </Form>
    )
  }
}

const option = {
  onFieldsChange: (props, fields) => {
    // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
  },
  mapPropsToFields: (props) => {
    // 把父组件的属性映射到表单项上（可用于把 Redux store 中的值读出）
  },
  onValuesChange: (props, values) => {
    // 任一表单域的值发生改变时的回调
  }
}

const mapStateToProps = (state) => {
  return {
    detail: state.samples.detail
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create(option)(FormDetail))
