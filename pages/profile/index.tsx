import useGetUser from '@/hooks/useGetUser'
import { User } from '@/types/schema/schema'

const UserComponent = () => {
  const { data, error, isLoading } = useGetUser()

  if (error) return <div>Error fetching user data</div>
  if (isLoading) return <div>Loading...</div>
  console.log(data)
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {data.map((user: User) => (
          <li key={user.UserID}>
            <strong>Username:</strong> {user.Username} <br />
            <strong>Email:</strong> {user.mail} <br />
            <strong>Phone:</strong> {user.Phonenumber}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserComponent
