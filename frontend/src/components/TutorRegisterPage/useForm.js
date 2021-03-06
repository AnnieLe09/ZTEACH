import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase';

const useForm = (callback, validate) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
   id: "",
   image:"",
   username: "",
   introduce: "No intro",
   name: "",
   user_type: "Học viên",
   gender: "Nam",
   gender_secure: "Công khai",
   birthday: "2001-12-17",
   birthday_secure: "Công khai",
   classes: [],
   major: "",
   literacy: "",
   fee: "",
   address: "No address",
   address_secure: "Riêng tư",
   email: "No email",
   email_secure: "Riêng tư",
   contact: "No Contact",
   contact_secure: "Riêng tư",
 });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const ArrAdapter = (e) =>{
    var res = [];
    for (let i = 0; i < e.length; i++)
      res.push(e[i]["value"]);
    return res;
  }

  const [classesLabel, setClassLabel] = useState([]);
  const classesChange = e => {
   setClassLabel(e);
   setValues({
     ...values,
     ["classes"]: ArrAdapter(e)
   });
 };

 const salaryChange = e => {
  const value = e.target.value.replace(/\D/g, "");
  const re = /^[0-9\b]+$/;
  if (e.target.value === '' || re.test(e.target.value)) {
    setValues({
      ...values,
      ["fee"]: value
    });
  }
};

  // function add image : (only 1 image)

  const updateData = (data) => {
    const user = JSON.parse(window.sessionStorage.getItem("user19120000"));
    user.introduce = data.introduce;
    user.name=data.name;
    user.gender = data.gender;
    user.classes = data.classes;
    user.birthday = data.birthday;
    user.major = data.major;
    user.literacy = data.literacy;
    user.address = data.address;
    user.address_secure = data.address_secure;
    user.email = data.email;
    user.email_secure = data.email_secure;
    user.contact = data.contact;
    user.contact_secure = data.contact_secure;
    user.gender_secure = data.gender_secure;
    user.birthday_secure = data.birthday_secure;
  }

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    if (!errors.isError) {
      axios.put('http://localhost:8000/tutors/register', values).then(res => { // 'http://localhost:8000/' + usertype + '/edit', values
        const msg = res.data;
        if (!msg.error) {
          alert("Cập nhật thành công!");
          window.sessionStorage.setItem("user19120000", JSON.stringify(values));
          
          navigate('/profile/' + values.username);
        }
        else{
          alert("Cập nhật thất bại!");
        }
      })
    }
  };

  const [UserImage, setUserImage] = useState({
    image: null,
    url: values.image,
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
      },
      () => {
          // complete function ....
          storage.ref('images').child(name).getDownloadURL().then(url => {
              setValues({
                ...values,
                ["image"]: url
              })
              axios.put('http://localhost:8000/users/edit-image', {username: values.username, image: url}).then(res=>{
                const message = res.data;
                if (!message.error){
                  const user = JSON.parse(window.sessionStorage.getItem("user19120000"));
                  user.url = url;
                  alert("Cập nhật ảnh thành công!");
                }
              }
              )
          })
      });
  }
}
  
  const [CertImage, setCertImage] = useState([]);
const handleChangeCert = e => {
  if (e.target.files[0]) {
      const image = e.target.files[0];
      setCertImage({
        ...CertImage,
        ["image"]:image
      })
      const name = image.name + '-' + Date.now();
      const uploadTask = storage.ref(`images/${name}`).put(image);
      uploadTask.on('state_changed',
      (snapshot) => {
          // progrss function ....
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setCertImage({
            ...CertImage,
            ["progress"]:progress
          })
      },
      (error) => {
          // error function ....
          console.log(error);
      },
      () => {
          // complete function ....
          storage.ref('images').child(name).getDownloadURL().then(url => {
              setValues({
                ...values,
                ["certificate"]: values.certificate.push(url)
              })
              //http://localhost:8000/users/edit-image
              axios.put('http://localhost:8000/tutors/add-certificate',{username: values.username, image: url}).then(res=>{
                const message = res.data;
                if (!message.error){
                  alert('Cập nhật bằng cấp thành công')
                //window.sessionStorage.setItem("user19120000", values);
                }
              }
              )
          })
      });
  }
}


  useEffect(() => {
     const fetchData = async() => {    
      const user = JSON.parse(window.sessionStorage.getItem('user19120000'));
      axios.post('http://localhost:8000/users/profile', {username: user.username }).then(res => {//   https://localhost:8000/ + user_type + edit
      const data = res.data;
      user.image = data.image;
      setValues({
        id: data._id,
        image: data.image,
        username: data.username,
        introduce: data.introduce,
        name: data.name,
        user_type: data.user_type,
        gender: data.gender,
        gender_secure: data.gender_secure,
        birthday: data.birthday,
        birthday_secure: data.birthday_secure,
        classes: [],
        major: data.major,
        literacy: data.literacy,
        fee: data.fee,
        address:data.address,
        address_secure: data.address_secure,
        subjects:data.subjects,
        email: data.email,
        email_secure: data.email_secure,
        contact: data.contact,
        contact_secure: data.contact_secure,
        certificate: [],
    });
   })
   };
   fetchData();
   
}, []);

  return { handleChange, handleSubmit, classesChange,salaryChange, handleChangeImage, handleChangeCert, classesLabel,  values, errors };
};

export default useForm;
