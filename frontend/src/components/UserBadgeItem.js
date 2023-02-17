export default function UserBadgeItem({user, handleFunction, admin = ''}) {
    return (
        <div className={"bg-gradient-to-tr from-blue-700 to-pink-700 text-white text-lg font-bold p-2 m-2 rounded-xl cursor-pointer"} onClick={handleFunction}>
            {/*///TODO: Avatar*/}
            {(admin && admin._id === user._id) ? (<span>{user.name} (admin)</span>) : (<span>{user.name}</span>)}
        </div>
    )
}