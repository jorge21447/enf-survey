import { useEffect, useState } from "react"
import useSWR from 'swr'
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify"


export const useAuth = ({ middleware, url }) => {


    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const [respuesta, setRespuesta] = useState('')

    const { data: user, error, mutate } = useSWR('/api/user', () => (
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors)
            })
    ))

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)


            localStorage.setItem('AUTH_TOKEN', data.token)
            localStorage.setItem('usuario', JSON.stringify(data.user))
            setErrores([])
            await mutate()


        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors || []))
        } finally {
            //setCargando(false)
        }
    }

    const register = async (datos, setErrores) => {
        try {
            //setCargando(true);
            const { data } = await clienteAxios.post('/api/register', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            localStorage.setItem('usuario', JSON.stringify(data.user))
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error?.response?.data?.errors))
        }

    }

    const logout = async () => {

        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            localStorage.removeItem('usuario')
            await mutate(undefined)
            navigate('/')
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url)
        }
        if (middleware === 'guest' && user && user.role_id === 1) {
            navigate('/admin')
        }

        if (middleware === 'admin' && user && !(user.role_id === 1)) {
            navigate('/')
        }


        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, error])

    return {
        login,
        register,
        logout,
        user,
        error
    }
}