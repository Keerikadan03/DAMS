import userimg from "../../assets/images/doctor-img01.png"

const UserDashboard = () => {
  return (
    <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
            <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
              <img src={userimg} alt=""  className="w-full h-full rounded-full"/>
            </figure>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserDashboard