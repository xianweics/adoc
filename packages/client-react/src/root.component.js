import React, { useState, useEffect } from "react";
import createRequest from "./utils/request";
import "antd/dist/antd.css";
import { Button, Space, Table, Form, Input, Row, Col } from "antd";
import "./style.css";

const request = createRequest();

export default function Example() {
  const [goodsList, setGoodsList] = useState(0);

  const [loading, setLoading] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = async (values) => {
    const { name, total } = values;
    await request.post("goods", {
      name,
      total,
    });
    await getGoods();
    form.resetFields();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "total",
      dataIndex: "total",
    },
    {
      title: "rest",
      dataIndex: "rest",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button type="primary" danger onClick={() => delGoods(record.id)}>
          删除
        </Button>
      ),
    },
  ];

  const getGoods = async () => {
    setLoading(true);
    const goodsList = await request.get("goods");
    setGoodsList(goodsList);
    setLoading(false);
  };

  const delGoods = async (id) => {
    await request.delete(`goods/${id}`);
    getGoods();
  };

  const goVue3 = () => {
    window.location.href = "/vue3";
  };

  useEffect(() => {
    getGoods();
  }, []);

  return (
    <div className="wrap">
      <h1>react 17</h1>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <div style={{ textAlign: "right" }}>
          <Button type="primary" onClick={goVue3}>
            to Vue3
          </Button>
        </div>

        <Form
          {...layout}
          form={form}
          name="control-hooks"
          layout="inline"
          onFinish={onFinish}
        >
          <Row style={{ width: "100%" }}>
            <Col span={9}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item name="total" label="Total">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item {...tailLayout}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    添加
                  </Button>
                  <Button type="primary" onClick={getGoods}>
                    刷新
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          loading={loading}
          rowKey="id"
          columns={columns}
          dataSource={goodsList}
        />
      </Space>
    </div>
  );
}
