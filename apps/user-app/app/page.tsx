

import { Button } from "@repo/ui/button";
import {Input} from "@repo/ui/input"
import {Idea} from "@repo/store/idea"


export default  function  Home() {
	console.log(Idea)
  return (
	<Button appName="uer-app">
	Click Me 
	<Input/>
	<div className="bg-blue-800 text-center">
		  HI this is god 
		  {
			Idea
		  }
	</div>
</Button>
  );
}
