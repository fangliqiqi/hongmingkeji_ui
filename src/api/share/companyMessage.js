import request from "@/utils/request";

// 查询加盟商信息列表
export function listCompanyMessage(query) {
  return request({
    url: "/share/companyMessage/list",
    method: "get",
    params: query
  });
}

// 查询加盟商信息详细
export function getCompanyMessage(id) {
  return request({
    url: "/share/companyMessage/" + id,
    method: "get"
  });
}

// 新增加盟商信息
export function addCompanyMessage(data) {
  return request({
    url: "/share/companyMessage",
    method: "post",
    data: data
  });
}

// 修改加盟商信息
export function updateCompanyMessage(data) {
  let obj1 = Object.assign({}, data);
  delete obj1.address
  delete obj1.companyName
  delete obj1.prov
  delete obj1.city
  delete obj1.principal;
  delete obj1.principalPhone;
  delete obj1.creditCode
  console.log(obj1);
  return request({
    url: "/share/companyMessage",
    method: "put",
    data: obj1
  });
}

// 删除加盟商信息
export function delCompanyMessage(id) {
  return request({
    url: "/share/companyMessage/" + id,
    method: "delete"
  });
}

// 导出加盟商信息
export function exportCompanyMessage(query) {
  return request({
    url: "/share/companyMessage/export",
    method: "get",
    params: query
  });
}
