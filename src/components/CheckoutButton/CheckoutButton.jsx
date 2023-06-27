import { Button } from '@mui/material'
import "../../app/globals.css";

export default function CheckoutButton({marginTop, marginBottom}) {
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`
  }
  
  return (
    <Button className='btn' variant="contained" style={style}>Оформить заказ</Button>
  )
}
