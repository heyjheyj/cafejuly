# Project : Cafejuly

### Stack(Skill): React, PostCSS, Nodejs, Express, MongoDB, Cloudinary
### Date: 2021년 12월 20일 기획 ~ 2022년 1월 15일 배포
### 주요 기능: 상품등록, 장바구니, 결제, 구매히스토리 관리, 로그인/로그아웃/Authentication/회원가입, 종류별/가격별 필터, 상품 검색기능 등
### Heroku 배포주소 : https://cafejuly.herokuapp.com/
- test계정 - id: test12@gamil.com, pw: test12

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/90097736/152655547-1b4aec90-1e39-4ae9-aea1-fb7f9e7e7ac4.gif)


## 현재 : 어마무시하게 많은 버그들을 수정중입니다;

# Error Handling Log

## 12월 23일 React Hook Form 유효성 체크
register page에서 react-hook-form을 이용한 유효성 체크를 써보기로 했다.

### 1. Apply Validation

- 공식사이트를 보면 유효성 체크 규칙을 7가지(required, min, max, minLength, maxLength, pattern, validata) 제공한다고 명시
- 아래 예제는 4개의 input 중 3개에 대해 유효성 체크 적용
’firstName’ field는 값이 없으면 안되고 길이는 20까지만 허용하도록 한다. ‘age’ field는 18세~99세까지만 등록할 수 있도록 허용하고 있다.

```jsx
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  );
}
```

### 2. 내 프로젝트에 적용하기

```jsx
const { register, handleSubmit, watch, formState: { errors } } = useForm();
const password = useRef();
password.current = watch("password");

const onSubmit = data => {
    console.log("data", data);

    let body = {
      name: data.name,
      email: data.email,
      password: data.password
    };
    user.register(body);
    navigate("/login");
};

<form
  ref={formRef}
  onSubmit={handleSubmit(onSubmit)}
  className={styles.registerform}
>
    <label>Email</label>
    <input
      type="email"
      placeholder="email"
      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
    />
    {errors.email && <p>This email field is required</p>}

    <label>Name</label>
    <input
      type="text"
      placeholder="name"
      {...register("name", { required: true, maxLength: 10 })}
    />
    {errors.name &&
      errors.name.type === "required" &&
      <p> This name field is required</p>}
    {errors.name &&
      errors.name.type === "maxLength" &&
      <p> Your input exceed maximum length</p>}

    <label>Password</label>
    <input
      type="password"
      placeholder="password"
      {...register("password", { required: true, minLength: 5 })}
    />
    {errors.password &&
      errors.password.type === "required" &&
      <p> This name field is required</p>}
    {errors.password &&
      errors.password.type === "minLength" &&
      <p> Password must have at least 5 characters</p>}

    <label>Password Confirm</label>
    <input
      type="password"
      placeholder="password confirm"
      {...register("password_confirm", {
        required: true,
        validate: value => value === password.current
      })}
    />
    {errors.password_confirm &&
      errors.password_confirm.type === "required" &&
      <p> This password confirm field is required</p>}
    {errors.password_confirm &&
      errors.password_confirm.type === "validate" &&
      <p>The passwords do not match</p>}

  <input type="submit" />
</form>
```

- useForm > register : input이나 select 요소를 등록하거나 유효성 체크 규칙을 적용할 수 있도록 한다.
- useForm > handleSubmit : form의 유효성 체크가 성공적으로 완료되면 form data를 받아 submit하는 함수다.
- useForm > watch : 특정 input을 감시하고 input값을 리턴하는 함수. 프로젝트 안에서는 password와 password confirm이 같은 값인지 확인하기 위해 사용
- useForm > formState error : field값이 비어있거나 유효성 체크에 걸린다면 errormessage를 보여주도록 설정

## 12월 24일 Mongoose 이용하기
### 1. Mongoose 설치 및 이용

- MongoDB를 이용하기 위해서는 mongoose, node.js를 설치해야 한다.

```jsx
//mongoose 설치
$ npm install mongoose --save
```

```jsx
//mongoose 불러오기
const mongoose = require('mongoose')
```

### 2. Mongoose Schema 이용하기

- Schema를 만들 때 type 키값으로 줄 수 있는 속성은 String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema이 있다.
- type 속송 외에도 추가 속성을 줄 수 있다(required, default, select, validate, get, set, alias, immutable)
- userSchema를 만들었다.

```jsx
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minglength: 5
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
```

## 12월 27일 리덕스를 쓸 것인가
- 이전 프로젝트에서는 Redux를 사용해 유저 관리를 했다. 컴포넌트들의 상태 관련 로직을 따로 분리시켜 관리할 수 있고, 글로벌 상태 관리도 쉽게 할 수 있기 때문이다.

### 1. 리덕스를 사용하는게 마냥 좋을까?
- 일단 리덕스를 사용하기 위해서는 액션타입 정의, 액션함수 정의, 리듀서, 스토어 등 기본적으로 만들어야 하는 파일들이 많다.

```jsx
// types.js

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const REGISTER = "REGISTER";
export const AUTH_USER = "AUTH_USER";
```

```jsx
//reducer.js

import { USER_LOGIN, USER_LOGOUT, REGISTER, AUTH_USER } from "./types";

export default function (state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, success: action.payload };
    case USER_LOGOUT:
      return { ...state };
    case REGISTER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
```

```jsx
//action.js

import { USER_LOGIN, USER_LOGOUT, REGISTER, AUTH_USER } from "./types";

export const login = (userData) => {
  const request = Axios.post(`${USER_SERVER}/login`, userData).then(
    (response) => response.data
  );
  return {
    type: USER_LOGIN,
    payload: request
  };
};

export const logout = () => {
  const request = Axios.get(`${USER_SERVER}/logout`).then(
    (response) => response.data
  );
  return {
    type: USER_LOGOUT,
    payload: request
  };
};

export const registerUser = (dataToSubmit) => {
  const request = Axios.post(`${USER_SERVER}/register`, dataToSubmit).then(
    (response) => response.data
  );
  return {
    type: REGISTER,
    payload: request
  };
};

export const auth = () => {
  const request = Axios.get(`${USER_SERVER}/auth`).then(
    (response) => response.data
  );
  return {
    type: AUTH_USER,
    payload: request
  };
};
```

```jsx
//index.js

import { combineReducers } from "redux";
import user from "./reducer";

const rootReducer = combineReducers({
  user
});

export default rootReducer;
```

```jsx
//react root file

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import rootReducer from "./redux/index";

const store = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider
      store={store(
        rootReducer
      )}
    >
        <App />
    </Provider>
  document.getElementById("root")
);
```

- 특히 프로젝트가 작은 단위인 경우 리덕스를 사용하면 오히려 신경써야 할 것들이 더 많아진다. 동내뒷산 가는데 산악 장비 다 챙겨 가는 느낌;;

### 2. 컴포넌트 내에서 State관리하기로 결정

- 혼자 하는 프로젝트이고 상태관리가 필요한 것은 유저뿐이니, 컴포넌트 내에서 State를 관리하기로 했다.
- app.jsx 파일에서 유저 상태를 관리하고 나머지 컴포넌트들은 app 컴포넌트로 부터 받은 props를 이용하는 것으로 정리.

```jsx
function App() {
  const [userData, setUserData] = useState();
  const user = new User()

  useEffect(() => {
    queueMicrotask(async () => {
      let userdata = await user.getUser();
      setUserData(userdata);
    });
  }, [setUserData]);

  return (<>
    {userData ? 
        <Navbar userData={userData} />
          : <NavbarN />}
          <section className={styles.app}>
        <Routes>
            <Route path="/" element={<Landingpage userData={userData} />} />
            <Route path="/login" element={<Login userData={userData} />} />
            <Route path="/register" element={<Register userData={userData} />} />
            <Route path="/upload" element={<UploadPage userData={userData} />} />
            <Route path="/user/cart" element={<CartPage userData={userData} />} />
            <Route
              path="/product/:productId"
              element={<DetailPage userData={userData} />}
            />
            <Route path="/purchased" element={<Purchased userData={userData} />} />
          </Routes>
	       </section>
    </>
  );
}
```

## 12월 29일 웹요청 취소🧹
<img width="558" alt="untounted" src="https://user-images.githubusercontent.com/90097736/159210538-3cc28762-4d12-42d4-acd1-521376b5f408.png">
- 컴포넌트가 렌더링 될 때 Axios로 데이터를 가져와 set함수를 업데이트 하는 로직을 구현했는데, 메모리 누수가 발생한다는 오류
- 해결방법은 총 3가지가 있는 것으로 확인

1. useEffect에 mounted 상태 명시

  ```jsx
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let mounted = true,
      // Axios 통신
          ..
          ..
    return () => {
          let mounted = false
    }
  }, [])
  ```

2. Axios 끝내는 함수를 useEffect에 넣어주기
([https://merrily-code.tistory.com/117](https://merrily-code.tistory.com/117) 참고)

```jsx
useEffect(() => {
    const source = axios.CancelToken.source()

    const fetchUsers = async () => {
        try {
            await Axios.get('/users', {
                cancelToken: source.token,
            })
            // ...
        } catch (error) {
            if (Axios.isCancel(error)) {
            } else {
                throw error
            }
        }
    }

    fetchData()

    return () => {
        source.cancel()
    }
}, [])
```

3. http fetch를 취소하는 AbortController 이용
- useEffect 내부에 에 선언

```jsx
let abortController = new AbortController()
return () => {
    abortController.abort()
```

## 12월 30일 라이프사이클

기능 구현에만 집중하며 개발을 하다보니.. 처리해야할 에러 메시지가 산더미다.
특히 제일 문제는 useEffect dependency였는데, 에러 메시지에서 권고대로 dependency를 넣어주면 무한 렌더링이 발생한다.

- 해결? 
- Axios나 fetch함수 등 서버와 통신하는 함수 내부에 state를 변경하는 set함수를 함께 사용하면 같은 문제가 발생한다.
- 서버 통신 결과는 함수의 return값으로 받아 그 값을 set함수에 셋팅해주는 방법으로 변경하니 에러는 사라졌다
- 또한 useEffect내에서는 async, await가 작동하지 않으므로, queueMicrotask를 사용해줬다.

```jsx
const getAllComments = async () => {
    let data = { 
      productId: productId 
    }

    const result = await Axios.post('/api/comment/getComments', data).then(res => {
      if(res.data.success) {
        console.log('[detail Page]get All Comments', res.data.comments)
        const datas = res.data.comments
        return datas
      } else {
        console.log('의견을 불어오지 못했습니다.')
      }
    })

    return result;
  }

useEffect(
    () => {
      queueMicrotask(async () => {
        getProduct();
        let result = await getAllComments()
        setComments(result)
      })
    },
    [setProduct]
  );
```

## 1월 2일 비동기 처리
<img width="457" alt="스크린샷 2022-01-14 16 14 01" src="https://user-images.githubusercontent.com/90097736/159211012-ba182f67-2cb9-4dfd-9475-cf7f4b691c37.png">
아직도 비동기 처리가 미숙하다..ㅜㅜ
차라리 이번 기회에 제대로 정리를 하고 가려고 한다.

### 1. 자바스크립트 엔진은 Single Thread다.
따라서 동시에 두 가지 일을 처리할 수 없고, 한 번에 하나의 작업만이 가능하다. 
그래서 동기적 방식이 아닌 비동기(asynchronous)로 작업을 처리한다. setTimeout함수 예가 대표적이다.

```jsx
console.log('a')

function x() {
	console.log('x')
}
setTimeout(x, 3000)

console.log('b')

// 결과
// a
// b
// x
```

### 2. 코드 실행 순서
 - ‘a’가 콘솔에 log한다.
 - 3초 뒤 콘솔에 log하는 함수를 실행하기로 약속
 - 약속한 함수는 web api가 기억
 - ‘b’를 콘솔에 log
 - 3초 뒤 web api는  큐(queue)에 ‘x’를 log하는 함수를 보낸다.
 - 이벤트루프는 큐(FIFO)에 들어오는 순서대로 스택(LIFO)으로 보내 실행되도록 한다.

### 3. Promise

 - Promise는 ES6에서 비동기 처리를 다루기 위한 객체다. 서버와 통신을 하는 함수들(axios, fetch 등)은 기본적으로 비동기적으로 실행된다고 봐야 한다.
 - 콘솔에서 ‘pending(대기)’ 결과를 보지 않기 위해서는?

```jsx
// 1. 함수에 async, await 사용
	async getUser() {
    const result = await Axios.get("/api/users/auth").then((res) => {
      console.log("[Auth]get userData:", res.data);
      if (res.data) {
        return res.data;
      } else {
        alert("fail to get userData");
      }
    });
    return result;
  }

// 2. callback함수로 비동기 처리
// react는 useCallback이용
	function getUserData(callback) {
	  let user;
	
	  setTimeout(function () {
	    user = "angela";
	    callback(user);
	  }, 2000);
	}
	
	getUserData(function (user) {
	  console.log(user);
	});

// 3. queueMicrotask이용
// useEffect 내부에서는 async, await가 적용 안됨
	useEffect(() => {
	    queueMicrotask(async () => {
	      let userdata = await user.getUser();
	      setUserData(userdata);
	    });
	  }, [setUserData]);
```

