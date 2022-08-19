import { DeleteOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Collapse, message, Space } from 'antd';
import { useState } from 'react';
import { BoxStyle } from '../../static/css/board';
import Item from './item';
const { Panel } = Collapse;

export interface TrConf {
  id: string;
  name: string;
  maxnum: string;
  password: string;
  port: string;
  map: string;
  language: string;
  motd: string;
  priority: number;
  ip: string;
  npcstream: number;
  secure: boolean;
  banlist: boolean;
  upnp: boolean;
  steam: boolean;
  lobby: boolean;
  // deleteTodo: (name: string) => void;
  // updateTodo: (name: string, checked: boolean) => void;
}

const initialValue: TrConf = {
  id: '1',
  name: '配置方案一',
  maxnum: '16',
  password: 'sbsz',
  port: '7777',
  map: '空岛生存带师',
  language: 'zh-Hans',
  motd: 'welcome to Terraria',
  priority: 1,
  ip: '',
  npcstream: 0,
  banlist: false,
  secure: false,
  upnp: false,
  steam: false,
  lobby: false,
};

const initialScheme: TrConf[] = [
  initialValue,
  { ...initialValue, id: '2', name: '配置方案二' },
];

let defaultValue = JSON.parse(JSON.stringify(initialValue));

const style = { ...BoxStyle, minHeight: '543px' };

export default function Scheme() {
  const [confs, setConfs] = useState(initialScheme);

  const getExtra = (conf: TrConf) => {
    return (
      <div>
        <Space>
          <Button
            icon={<SaveOutlined />}
            onClick={(e) => {
              let newConfs = confs.map((obj) => {
                if (obj.id === conf.id) {
                  return conf;
                }
                return obj;
              });
              setConfs(newConfs);
              e.stopPropagation();
              message.success(conf.name + '已保存');
            }}
          >
            save
          </Button>
          <Button
            icon={<UndoOutlined />}
            onClick={(e) => {
              let newConfs = confs.map((obj) => {
                if (obj.id === conf.id) {
                  return { ...defaultValue, id: conf.id };
                }
                return obj;
              });
              setConfs(newConfs);
              e.stopPropagation();
              message.success(conf.name + '已重置');
            }}
          >
            reset
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('确定删除?')) {
                let newConfs = confs;
                newConfs = newConfs.filter((obj) => {
                  return obj.id !== conf.id;
                });
                setConfs(newConfs);
              }
              message.success(conf.name + '已删除');
            }}
          >
            delete
          </Button>
        </Space>
      </div>
    );
  };

  function updateConf(conf: TrConf) {
    const newConf = confs.map((obj) => {
      if (obj.id === conf.id) {
        obj = conf;
      }
      return obj;
    });
    setConfs(newConf);
  }

  function addConf() {
    let conf = { ...defaultValue, name: '默认配置方案', id: '3' };
    let newConfs = [...confs, conf];
    setConfs(newConfs);
  }

  return (
    <div>
      <div style={style}>
        <div style={{ display: 'inline-flex', width: '1200px' }}>
          <h2 style={{ marginBottom: '20px' }}>
            当前共有: {confs.length}个配置方案
          </h2>
          <Button
            style={{ marginLeft: '846px' }}
            size="large"
            onClick={addConf}
          >
            创建新实例
          </Button>
        </div>
        <Collapse defaultActiveKey={confs.length > 1 ? '' : '1'}>
          {confs.map((conf) => {
            return (
              <Panel header={conf.name} key={conf.id} extra={getExtra(conf)}>
                <Item conf={conf} key={conf.id} updateConf={updateConf}></Item>
              </Panel>
            );
          })}
        </Collapse>
      </div>
      <div style={{ minHeight: '150px' }}></div>
    </div>
  );
}
