
const GetData = async (url: string) => {
  try {
    const response = await fetch(url)
    if(!response.ok) throw new Error('Возникла ошибка в получении данных через fetch')
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export default GetData