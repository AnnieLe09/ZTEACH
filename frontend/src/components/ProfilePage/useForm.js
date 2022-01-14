import { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalVar from '../../GlobalVar';
import { data } from 'jquery';
import { storage } from '../../firebase';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
   id: "",
   image: "",
   username: "KietChung",
   introduce: "No intro",
   name: "Kiệt Chung",
   user_type: "",
   gender: "Nam",
   gender_secure: "Công khai",
   birthday: "2001-12-17",
   voting: "4.5",
   evaluate: "10",
   dayreg: "2022-01-04",
   birthday_secure: "Công khai",
   subjects: ["Toán, Lý"],
   classes: ["Lớp 1", "Lớp 2"],
   major: "CNTT",
   literacy: "Sinh viên",
   fee: "",
   address: "No address",
   address_secure: "Công khai",
   email: "No email",
   email_secure: "Công khai",
   contact: "No Contact",
   contact_secure: "Công khai",
 });

    const URL = window.location.pathname;
    const tmp = URL.split('/');
    const username = tmp[tmp.length - 1];
    const user = JSON.parse(window.sessionStorage.getItem('user19120000'));
    var isHolderAccount = false;
    if (!user){
      isHolderAccount = false;
    }
    else if (user.username === username){
      isHolderAccount = true;
    }
  // set listRequest after render
  // return VALUES for PROFILE
  // IF xóa tính sau
  // 
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    console.log(values);
    if(true){
    //if (!errors.isError) {
      const user_type = GlobalVar.user.user_type === "student"? "users": "tutors";
      axios.post("http://localhost:8000/" + user_type + GlobalVar.user.username, values).then(res => {
        console.log(res)
        const { isSucceeded } = res.data;
        if (isSucceeded === true) {
            alert("Thành công rồi nha!")
        }
        else{
          alert("Thất bại!")
        }
    });
    }
  };

  const checkValue = (data) => {
      var get_id =data._id;
      var get_username =  data.username;
      var get_intro =  data.introduce;
      var get_name =  data.name;
      var get_user_type =  data.user_type;
      var get_gender = data.gender;
      var get_gender_secure = data.gender_secure;
      var get_birth_day = data.birthday;
      var get_birth_day_secure = data.birthday_secure;
      var get_classes = data.classes;
      var get_major = data.major;
      var get_literacy = data.literacy;
      var get_fee = data.fee;
      var get_address = data.address;
      var get_address_secure = data.address_secure;
      var get_subjects =  data.subjects;
      var get_email = data.email;
      var get_email_secure = data.email_secure;
      var get_contact = data.contact;
      var get_contact_secure = data.contact_secure;
      var get_voting = data.voting;
      var get_image = data.image;
      // Toàn bộ check trong hàm này
      // Tùy vào người dùng sẽ được thiết lập khác nhau
      // Khi sang trang edit profile thì phải load lần nữa chính nó
      // if ()
      // 
      var isLogin = true;
      const user = JSON.parse(window.sessionStorage.getItem("user19120000"));
      var isYourSelf = false;
      if (!user) isLogin = false;
      else if (user.username === get_username) isYourSelf = true;
      console.log("sdsfsdfsdsdf");
      console.log(isYourSelf);
      console.log(isLogin);
      // Xet login
      if (!isLogin){
        // Neu chua login thì ko hien thi neu o che do "Bao mat"
        if (get_gender_secure==="Bảo mật"){
          get_gender = "Đã bị ẩn";
        }  
        if (get_birth_day_secure==="Bảo mật"){
          get_birth_day = "Đã bị ẩn";
        }
        if (get_address_secure==="Bảo mật"){
          get_address = "Đã bị ẩn";
        }
        if (get_email_secure==="Bảo mật"){
          get_email = "Đã bị ẩn";
        }
        if (get_contact_secure==="Bảo mật"){
          get_contact = "Đã bị ẩn";
        }   
      else if (isLogin && !isYourSelf){
        // Neu da dang nhap
        // Neu set rieng thu thi set = "Da bi an"
        if (get_gender_secure==="Riêng tư"){
          get_gender = "Đã bị ẩn";
        }  
        if (get_birth_day_secure==="Riêng tư"){
          get_birth_day = "Đã bị ẩn";
        }
        if (get_address_secure==="Riêng tư"){
          get_address = "Đã bị ẩn";
        }
        if (get_email_secure==="Riêng tư"){
          get_email = "Đã bị ẩn";
        }
        if (get_contact_secure==="Riêng tư"){
          get_contact = "Đã bị ẩn";
        }
      }
    }
      // Xet da ket noi
      // Neu da tung ket noi thi thay them btn danh gia
      // Neu k phai chu tai khoan
        // Neu chua ket noi --> ket noi or huy
        // Neu da tung ket noi --> hien cai danh gia tung danh gia la bnhiu (DEFAULT: 4)
      // Lay danh sach cac user da ket noi theo http:// something at backend
      // for in list --> connected?
      // if is connected --> can voting
      // FILE PROFILE also check if is account holder
      // It will hide or appear btn for edit + btn "Chinh sua trang ca nhan" + All info

      setValues({
        id: get_id,
        image: get_image,
        username: get_username,
        introduce: get_intro,
        name: get_name,
        user_type: get_user_type,
        gender: get_gender,
        gender_secure: get_gender_secure,
        birthday: get_birth_day,
        birthday_secure: get_birth_day_secure,
        classes: get_classes,
        major: get_major,
        literacy: get_literacy,
        fee: get_fee,
        address: get_address,
        address_secure: get_address_secure,
        subjects: get_subjects,
        email: get_email,
        email_secure: get_email_secure,
        contact: get_contact,
        contact_secure: get_contact_secure,
        voting: get_voting,
      });
  }

  
  function UserPost(props) {
    const {order, id, title, dayPost} = props;
    //const { order, username, level, gender } = props;

    return (
        <div className="flex-request-line">
            <div className="request-no-553">{order}</div>
            <div className="request-username-553">
                <a href={'http://localhost:3000/posts/' + id} style={{ 'text-decoration': 'none' }}>{title}</a>
            </div>
            <div className="request-level-553">{dayPost}</div>
            {/* <div className="request-gender-553">{gender}</div> */}
            { isHolderAccount &&
            <div className="request-accept-553">
                <button className="button-request-accept-553" type="submit" >
                    <div className="request-button-553">
                        <a href={'http://localhost:3000/posts/' + id}>Chỉnh sửa</a>
                    </div>
                </button>
            </div>
            }
            { isHolderAccount && 
            <div className="request-deny-553">
                <button className="button-request-deny-553" type="submit" >
                    <div className="request-button-553">
                        Xóa
                    </div>
                </button>
            </div>
            }
        </div>
    );
  }

  function RequestConnect(props) {
    const {order, id, username, dayRequest} = props;
    //const { order, username, level, gender } = props;

    return (
        <div className="flex-request-line">
            <div className="request-no-553">{order}</div>
            <div className="request-username-553">
                <a href={'http://localhost:3000/posts/' + id} style={{ 'text-decoration': 'none' }}>{username}</a>
            </div>
            <div className="request-level-553">{dayRequest}</div>
            {/* <div className="request-gender-553">{gender}</div> */}
            <div className="request-accept-553">
                <button className="button-request-accept-553" type="submit" >
                    <div className="request-button-553">
                        Chấp nhận
                    </div>
                </button>
            </div>
            <div className="request-deny-553">
                <button className="button-request-deny-553" type="submit" >
                    <div className="request-button-553">
                        Từ chối
                    </div>
                </button>
            </div>
        </div>
    );
  }
  //http://localhost:8000/connects/get-tutor-connect
  
  const [listRequest, setRequest] = useState([]);
  useEffect(() =>{
    const URL = window.location.pathname;
    const tmp = URL.split('/');
    const username = tmp[tmp.length - 1];
    const user = JSON.parse(window.sessionStorage.getItem('user19120000'));
    var isHolderAccount = false;
    if (!user){
      isHolderAccount = false;
    }
    else if (user.username === username){
      isHolderAccount = true;
    }
    
    const fetchData = async() => {  
      axios.post('http://localhost:8000/connects/get-tutor-connect', {tutor: username }).then(res => {//   https://localhost:8000/ + user_type + edit
      const data = res.data;
      for (let i = 0; i < data.length; i++){
        data[i]["order"] = i + 1;
      }
      setRequest(data.map(v => (
        <RequestConnect id={v._id} username={v.username} dayRequest={v.dayRequest} order={v.order}></RequestConnect>
      )));
      console.log(listRequest);
      console.log("Im here");
      //console.log(listPost);
     })
     // Cho chỉnh sửa hay ko là việc của UI
     //
     }
     fetchData();
  }, [])


  const [listPost, setPostList] = useState([]);
  useEffect(() =>{
    // Get user post
    //http://localhost:8000/posts
    const URL = window.location.pathname;
    const tmp = URL.split('/');
    const username = tmp[tmp.length - 1];
    const user = JSON.parse(window.sessionStorage.getItem('user19120000'));
    
    const fetchData = async() => {   
      axios.post('http://localhost:8000/posts/user-post', {username: username }).then(res => {//   https://localhost:8000/ + user_type + edit
      const data = res.data;
      for (let i = 0; i < data.length; i++){
        data[i]["order"] = i + 1;
      }
      setPostList(data.map(v => (
        <UserPost id={v._id} title={v.title} dayPost={v.createdAt} order={v.order}></UserPost>
      )));
      console.log("Im here");
      //console.log(listPost);
     })
     // Cho chỉnh sửa hay ko là việc của UI
     //
     }
     fetchData();
  }, [])

  useEffect(() =>{
    // Get user post
    //http://localhost:8000/posts
    const URL = window.location.pathname;
    const tmp = URL.split('/');
    const username = tmp[tmp.length - 1];
    const user = JSON.parse(window.sessionStorage.getItem('user19120000'));
    
     const fetchData = async() => {   
      axios.post('http://localhost:8000/posts/user-post', {username: username }).then(res => {//   https://localhost:8000/ + user_type + edit
      const data = res.data;
      console.log("I'm here bro");
      //console.log(data);
      for (let i = 0; i < data.length;i++){
        data[i]["order"] = i + 1;
      }
      console.log(data);
     })
     // Cho chỉnh sửa hay ko là việc của UI
     //
     }
     fetchData();
  }, [])

  useEffect(() => {
  const URL = window.location.pathname;
  const tmp = URL.split('/');
  const username = tmp[tmp.length - 1];
  const user = JSON.parse(window.sessionStorage.getItem('user19120000'));
   const fetchData = async() => {    
    axios.post('http://localhost:8000/users/profile', {username: username }).then(res => {//   https://localhost:8000/ + user_type + edit
    const data = res.data;
    if (!data)
      return;
   checkValue(data);
  })
   axios.post('http://localhost:8000/tutors/profile', {username: username }).then(res => {//   https://localhost:8000/ + user_type + edit
   const data = res.data;
   if (!data)
     return;
  checkValue(data);
})
   };
   fetchData();
   
}, []);

  const [UserImage, setUserImage] = useState({
      image: null,
      url: 'https://firebasestorage.googleapis.com/v0/b/zteach-images.appspot.com/o/images%2Fprofile.png?alt=media&token=34e94b8d-cda6-4df8-8f4b-88a022d3b3fe',
      progress: 0
    })

  const handleChangeImage = e => {
    if (e.target.files[0]) {
        const image = e.target.files[0];
        setUserImage({
          ...UserImage,
          ["image"]:image
        })
        const name = image.name + '-' + Date.now();
        const uploadTask = storage.ref(`images/${name}`).put(image);
        uploadTask.on('state_changed',
        (snapshot) => {
            // progrss function ....
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUserImage({
              ...UserImage,
              ["progress"]:progress
            })
        },
        (error) => {
            // error function ....
            console.log(error);
            console.log("Here");
        },
        () => {
            // complete function ....
            storage.ref('images').child(name).getDownloadURL().then(url => {
                console.log(url);
                setValues({
                  ...values,
                  ["image"]: url
                })
                //http://localhost:8000/users/edit-image
                axios.put('http://localhost:8000/users/edit-image', {username: values.username, image: url}).then(res=>{
                  const message = res.data;
                  if (!message.error){
                  const user = JSON.parse(window.sessionStorage.getItem("user19120000"));
                  user.url = url;
                  //window.sessionStorage.setItem("user19120000", values);
                  //console.log(user);
                  alert("Cập nhật ảnh thành công!");
                  }
                }
                )
            })
        });
        // Post then change 2 link
    }
}


  return { handleSubmit , handleChangeImage, listPost, listRequest, values, errors };
};

export default useForm;
