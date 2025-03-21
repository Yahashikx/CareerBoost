import Backpack from '../../../assets/img/backpack.svg'

const Footer = () => {
  return (
    <div className='bg-black w-full py-12'>
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-white">
        <div className="flex items-center space-x-4">
          <img src={Backpack} alt="CareerBoost Logo" className="h-12 w-auto" />
          <p className="text-2xl font-semibold">CareerBoost</p>
        </div>
        <div className="flex flex-col items-center sm:items-start mt-6 sm:mt-0">
          <p className="text-lg font-medium">Телефон:</p>
          <p className="mt-2 text-sm text-gray-400">+7 (800) 123-45-67</p>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} CareerBoost. Все права защищены.</p>
      </div>
    </div>
  )
}

export default Footer;
