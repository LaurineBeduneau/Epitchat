import Avatar from 'react-avatar'

export function UserListItem({user, handleFunction}) {
    return (
        <div
            className={'flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-cyan-500 rounded-lg border-gray-400 border-b-2 border-r-2'}
            onClick={handleFunction}
        >
            <Avatar
                size="50"
                name={user.name}
                src={user.pic}
                round={true}
            />
            <div>
                <h3>{user.name}</h3>
                <h3><b>Email: </b>{user.email}</h3>
            </div>
        </div>
    )
}