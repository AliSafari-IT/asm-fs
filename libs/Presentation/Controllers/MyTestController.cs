﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Presentation.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MyTestController: ControllerBase
    {
        [HttpGet("test")]
        public IActionResult TestEndpoint()
        {
            return Ok("Test Successful");
        }
    }
}
