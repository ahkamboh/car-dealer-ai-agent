"use client"
import { Input } from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
function signup() {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <form>
        <div className="grid md:grid-cols-10 min-h-screen text-white ">
          <div className="col-span-5  bg-registration md:flex hidden flex-col justify-center items-center">
            <div className=' w-1/2 text-center '>
              <h1 className="plus-jakarta-sans-800 text-2xl bg-gradient-to-r uppercase from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                welcome to Crm
              </h1>
              <p className='font-light uppercase'>Login or create new account</p>
            </div>
          </div>
          <div className="col-span-5 from-[#0d1137] bg-registration-mobile to-[#020515] 2xl:p-0 p-5 bg-gradient-to-b flex flex-col justify-center items-center gap-4">
            <div className='  text-center md:hidden block '>
              <h1 className="plus-jakarta-sans-800 text-2xl uppercase">
                welcome to Crm
              </h1>
              <p className='font-light uppercase'>Login or create new account</p>
            </div>
            <div className="2xl:w-1/2 xl:w-3/5 lg:w-[75%] md:w-[85%] sm:w-[90%] w-[90%]  min-h-96 rounded-3xl plus-jakarta-sans-300 border-gray-400 border-2 p-8  from-[#0d1137] to-[#020515] bg-gradient-to-b ">
              <div className="text-center  py-2"><h1 className='font-bold plus-jakarta-sans-800 text-lg'>Register with</h1></div>
              <div className="flex gap-3 w-full justify-center items-center">
                <div className="w-[50px] cursor-pointer h-[50px] rounded-2xl border-gray-400 border-2 grid place-content-center items-center">
                  <img src="images/registration/facebook.svg" alt="facebook" />
                </div>
                <div className="w-[50px] cursor-pointer h-[50px] rounded-2xl border-gray-400 border-2 grid place-content-center items-center">
                  <img src="images/registration/apple.svg" alt="apple" />
                </div>
                <div className="w-[50px] cursor-pointer h-[50px] rounded-2xl border-gray-400 border-2 grid place-content-center items-center">
                  <img src="images/registration/google.svg" alt="googlk" />
                </div>
              </div>
              <div className="text-center  text-[#a0aec0] text-lg font-bold py-2">or</div>
              <div className="2xl:space-y-6 space-y-4">
                <div>
                  <Label htmlFor="name" >Name</Label>
                  <Input id='name' placeholder="Your full name" className='rounded-xl border-gray-400 border-2  py-5' />
                </div>
                <div>
                  <Label htmlFor="email" >Email</Label>
                  <Input id='email' placeholder="Your email address" className='rounded-xl border-gray-400 border-2 py-5 ' />
                </div>
                <div >
                  <Label htmlFor="password" >Password</Label>
                  <Input id='password' placeholder="Your password" className='rounded-xl border-gray-400 border-2 py-5' />
                </div>
                <div className="flex  items-center space-x-2 mt-2 ">
                  <Switch id="remember-me" />
                  <Label htmlFor="remember-me" className='cursor-pointer'>Remember me</Label>
                </div>

                <Button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 rounded-lg mt-2'>SIGN UP</Button>
                <div className="text-center">
                  <span className="text-[#a0aec0] text-sm font-normal  leading-tight">Already have an account? </span>
                  <Link href="/signin" className="text-white text-sm font-bold cursor-pointer hover:underline">Sign in</Link>
                </div>
              </div>
            </div>
            <div className="text-center plus-jakarta-sans-300 mt-9"><span className="text-[#a0aec0] text-sm font-normal leading-[21px]">@ 2024, Made with ❤️ by </span><span className="text-[#a0aec0] text-sm font-normal leading-[21px] "><strong>Infinity waves</strong> @ahkamboh</span><span className="text-[#a0aec0] text-sm font-normal leading-[21px]"> for a better web</span></div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default signup;
