<template>
  <div class="chinaMap">
    <div
      ref="MapMountNode"
      id="MapMountNode"
      style="height:calc(100vh - 120px);width:100%; min-width:1400px"
    ></div>
  </div>
</template>

<script>
import { mapDataID, countyID, getRoleCount, getCounty } from "@/api/index";
// import LogoVue from "../../layout/components/Sidebar/Logo.vue";
// import loginVue from '../../views/login.vue';

export default {
  name: "ChinaEcharts",

  data() {
    return {
      list: [],
      tableData: [],
      countyNum: [],
      companyName: [],
      provName: [],
      colorList: [],
      conlist: [],
      positions: [
        { name: "吉林", offsetX: 900, offsetY: 230 },
        { name: "黑龙江", offsetX: 930, offsetY: 150 },
        { name: "辽宁", offsetX: 860, offsetY: 290 },
        { name: "内蒙古", offsetX: 660, offsetY: 280 },
        { name: "新疆", offsetX: 196, offsetY: 266 },
        { name: "西藏", offsetX: 272, offsetY: 494 },
        { name: "云南", offsetX: 496, offsetY: 666 },
        { name: "广西", offsetX: 610, offsetY: 678 },
        { name: "海南", offsetX: 633, offsetY: 777 },
        { name: "澳门", offsetX: 696, offsetY: 717 },
        { name: "香港", offsetX: 704, offsetY: 711 },
        { name: "广东", offsetX: 700, offsetY: 680 },
        { name: "台湾", offsetX: 816, offsetY: 678 },
        { name: "南海诸岛", offsetX: 907, offsetY: 659 },
        { name: "福建", offsetX: 770, offsetY: 630 },
        { name: "浙江", offsetX: 810, offsetY: 560 },
        { name: "上海", offsetX: 830, offsetY: 512 },
        { name: "江苏", offsetX: 800, offsetY: 472 },
        { name: "山东", offsetX: 768, offsetY: 398 },
        { name: "天津", offsetX: 757, offsetY: 332 },
        { name: "河北", offsetX: 718, offsetY: 328 },
        { name: "北京", offsetX: 745, offsetY: 311 },
        { name: "山西", offsetX: 663, offsetY: 367 },
        { name: "陕西", offsetX: 616, offsetY: 338 },
        { name: "宁夏", offsetX: 566, offsetY: 376 },
        { name: "甘肃", offsetX: 502, offsetY: 358 },
        { name: "青海", offsetX: 388, offsetY: 400 },
        { name: "四川", offsetX: 516, offsetY: 516 },
        { name: "贵州", offsetX: 580, offsetY: 608 },
        { name: "重庆", offsetX: 596, offsetY: 540 },
        { name: "湖北", offsetX: 680, offsetY: 520 },
        { name: "湖南", offsetX: 666, offsetY: 580 },
        { name: "江西", offsetX: 726, offsetY: 590 },
        { name: "安徽", offsetX: 760, offsetY: 500 },
        { name: "河南", offsetX: 693, offsetY: 445 }
      ]
    };
  },
  methods: {
    //获得省市区表格的数据

    city(row) {
      const prov = row.prov;

      const city = row.city;
      getCounty({ city: city, prov: prov }).then(response => {
        this.countyNum = response.data;
      });
    },

    //获取区县合作商公司名
    enter(row) {
      const tableDataCounty = row.county;
      const prov = row.prov;
      const city = row.city;
      countyID({ city: city, prov: prov, county: tableDataCounty }).then(
        response => {
          this.companyName = response.data;
        }
      );
    },
    resize() {
      this.MapMountNode.resize();
    },

    getList() {
      mapDataID()
        .then(response => {
          let data = response.data;
          let tempArr = [],
            ccount = 0,
            pcount = 0;

          data.forEach((item, index, arr) => {
            // let pc = 0;
            let cityC = 0;
            item.citys.forEach(a => {
              pcount += a.countys.length;
              cityC += a.countys.length;
            });
            item.citys.forEach((cc, cidx, ca) => {
              // pc +=  ca.length
              ccount += cc.countys.length;
              cc.countys.forEach((ccc, ccidx, cca) => {
                let temp = {
                  prov: item.prov,
                  provCount: item.provCount,
                  provRow: arr.length,
                  city: cc.city,
                  cityCount: cc.cityCount,
                  cityRow: ca.length,
                  county: ccc.county,
                  countyCount: ccc.countyCount,
                  countyRow: cca.length,
                  countyC: ccount,
                  countyP: pcount,
                  cityC: cityC
                };
                tempArr.push(temp);
              });
            });
          });
          this.tableData = tempArr;
          this.conlist = data;

          this.colorList = data.map(item => {
            let temp = {
              name: item.prov
                .split("省")[0]
                .split("市")[0]
                .split("自治区")[0],
              value: item.provCount
            };
            return temp;
          });
          this.echartsFun();
        })
        .catch(err => {
          this.echartsFun();
        });
    },
    echartsFun() {
      let data = this.conlist || [];
      var yData = [];
      data.sort(function(o1, o2) {
        if (isNaN(o1.provCount) || o1.provCount == null) return -1;
        if (isNaN(o2.provCount) || o2.provCount == null) return 1;
        return o1.provCount - o2.provCount;
      });

      yData = data.map(items => {
        return items.prov + items.provCount;
      });

      let that = this;
      let positionName = [];
      let offsetX;
      let offsetY;
      let option = {
        title: {
          // text: "中国地图",
          textStyle: {
            fontSize: 30
          },
          x: "center"
        },
        tooltip: {
          show: true,
          enterable: true,
          padding: 0,
          // triggerOn: "click",
          //悬浮框定位
          position: function(pos, params, dom, rect, size) {
            that.positions.forEach(item => {
              if (item.name == that.positionName) {
                that.offsetX = (item.offsetX * size.viewSize[1]) / 817;
                that.offsetY = (item.offsetY * size.viewSize[1]) / 817;
              }
            });
            return [that.offsetX, that.offsetY];
          },
          formatter: function(params) {
            let _html = [];
            params.data = data;
            that.positionName = params.name;
            let name = params.name;
            let listCity = params.data.filter(item => {
              return item.prov.indexOf(name) != -1;
            });
            if (listCity.length > 0) {
              that.list = listCity[0].citys || [];

              listCity[0].citys.forEach(items => {
                _html.push('<div  class="city" >');
                _html.push(
                  '<div class="citycol ' +
                    (items.companyNumber == 10
                      ? "weiman"
                      : items.companyNumber == 20
                      ? "yiman"
                      : items.companyNumber == 30
                      ? "quanman"
                      : "") +
                    '" >'
                );
                _html.push('<span class="">' + items.city + "</span>");
                _html.push(
                  '<span class="right">' + items.cityCount + "</span>"
                );
                _html.push("</div>");
                _html.push('<div class="county_vi">');
                items.countys.forEach(item => {
                  _html.push('<div  class="county" >');
                  _html.push("<span>" + item.county + "</span>");
                  _html.push("<span>" + item.countyCount + "</span>");
                  // if (item.companys && item.companys.length > 0) {
                  _html.push('<div class="company_vi">');
                  item.companyNames.forEach(ite => {
                    _html.push('<div  class="companyName">');
                    _html.push("<span> " + ite.companyName + "</span>");
                    _html.push(
                      "<span> " +
                        that.selectDictLabel(that.statusOptions, ite.status) +
                        "</span>"
                    );
                    _html.push("</div>");
                  });
                  _html.push("</div>");
                  //}

                  _html.push("</div>");
                });
                _html.push("</div></div>");
              });
            }
            if (_html.length !== 0) {
              return (
                '<div style="padding:2px 20px 2px 20px; class="city" id="bushu">合作商部署</div>' +
                _html.join("")
              );
            }
          }
        },
        visualMap: {
          text: ["High", "Low"],
          showLabel: true,
          min: 0,
          max: 50,
          inRange: {
            color: ["#edfbfb", "#b7d6f3", "#40a9ed", "#3598c1", "#215096"]
          }
        },

        // 直角坐标系内绘图网格
        grid: {
          //grid 组件离容器右侧的距离
          right: 200,
          //grid 组件离容器上侧的距离
          top: 20,
          //grid 组件离容器下侧的距离
          bottom: 30,
          //grid 组件的宽度
          width: "20%",
          // minHeight:'20%',
          height: "70%"
        },

        // 直角坐标系 grid 中的 x 轴
        xAxis: {
          //坐标轴类型,value 为数值轴
          type: "value",
          //只在数值轴中（type: 'value'）有效。是否是脱离 0 值比例
          scale: true,
          //x 轴的位置
          position: "top",
          //坐标轴的分割段数
          splitNumber: 1,
          //坐标轴两边留白策略
          boundaryGap: false,
          splitLine: {
            //是否显示分隔线
            show: false
          },
          axisLine: {
            //是否显示坐标轴轴线。
            show: false
          },
          axisTick: {
            //是否显示坐标轴刻度。
            show: false
          },
          axisLabel: {
            //刻度标签与轴线之间的距离。
            margin: 2,

            textStyle: {
              color: "#aaa"
            }
          }
        },

        //直角坐标系 grid 中的 y 轴
        yAxis: {
          position: "right",
          //坐标轴类型,'category' 类目轴，适用于离散的类目数据
          type: "category",
          //坐标轴名称与轴线之间的距离
          nameGap: 16,
          //
          axisLine: {
            show: false,
            lineStyle: {
              color: "#ddd"
            }
          },
          //坐标轴刻度相关设置
          axisTick: {
            //是否显示坐标轴刻度
            show: false,
            //刻度线的样式设置
            lineStyle: {
              color: "#ddd"
            }
          },
          //坐标轴刻度标签的相关设置
          axisLabel: {
            // 坐标轴刻度标签的显示间隔，在类目轴中有效
            interval: 0,
            textStyle: {
              color: "#999"
            }
          },
          //类目数据，在类目轴（type: 'category'）中有效
          data: yData
        },

        geo: {
          //是否开启鼠标缩放和平移漫游，默认是不开启
          roam: false,
          //地图类型
          map: "china",
          //组件离容器左侧的距离。
          left: "20",
          //组件离容器右侧的距离。
          top: "10",
          bottom: "10",
          //地图的大小
          layoutSize: "80%",
          label: {
            normal: {
              show: true,
              fontSize: "10", //注意：地图省份名字字体如果过大会导致字体重叠
              color: "rgba(0,0,0,0.7)"
            }
          },

          //地图区域的多边形 图形样式
          itemStyle: {
            borderColor: "rgba(0, 0, 0, 0.2)",
            //高亮的样式。
            emphasis: {
              //地图区域的颜色。
              areaColor: "#fff464"
            }
          },

          //在地图中对特定的区域配置样式。
          regions: [
            {
              name: "南海诸岛",
              value: 0,
              //该区域的多边形样式设置
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false
                  }
                }
              }
            }
          ]
        },
        //系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            name: "mapSer",
            type: "map",
            mapType: "china",
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            //设置适应地图颜色的数据
            data: this.colorList
          }
        ]
      };

      this.MapMountNode = this.$echarts.init(this.$refs.MapMountNode);
      this.MapMountNode.setOption(option);
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.getList();
      this.getDicts("company_status")
        .then(response => {
          this.statusOptions = response.data;
          this.echartsFun();
        })
        .catch(err => {
          this.echartsFun();
        });
      window.addEventListener("resize", this.resize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    this.$echarts.dispose(this.$refs.MapMountNode);
    // off(window, "resize", this.resize);
  }
};
</script>

<style>
.chinaMap {
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
}
.china_div {
  width: 100%;
  min-width: 800px;
  min-height: 800px;
  height: 800px;
}
.china_div > div {
  height: 100% !important;
}

.county_vi,
.company_vi {
  display: none;
  flex-direction: column;
  position: absolute;
  left: 100%;
  top: 0;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.6);
}
.company_vi {
  margin-left: 0px !important;
}
.right {
  /* float: right !important; */
  position: absolute;
  right: 10px;
}
.Biaoge {
  max-width: 200px;
}
.city {
  margin-right: -10px;
}
.county,
.city,
.companyName {
  width: 100%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  position: relative;
}
.city > span:first-child() {
  margin-left: 20px;
}
.county > span,
.companyName > span {
  margin-left: 20px;
  margin-right: 20px;
}
.county > span:first-child(),
.city > span:first-child(),
.companyName > span:first-child() {
  min-width: 180px;
  display: inline-block;
}
.city:hover > .county_vi,
.county:hover > .company_vi {
  display: flex;
}
#bushu {
  font-size: 14px;
  font-weight: 600;
}

.citycol {
  width: 100%;
  padding-left: 10px;
}
.weiman {
  background: rgba(249, 205, 173, 1);
}
.yiman {
  background: rgba(252, 157, 154, 1);
}
.quanman {
  background: rgba(254, 67, 101, 1);
}
</style>
