import request from '@/utils/request'


export function registerUsername(name,password,email) {
  const params = new URLSearchParams();
				params.append('name', name);
				params.append('password', password);
				params.append('email', email);
return request({
    url: '/map/user/v1/register/',
    method: 'post',
    data:params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
})
}


