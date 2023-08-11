using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehberAPI.Context;
using RehberAPI.Models;

namespace RehberAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CollectionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CollectionController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetCollections()
        {
            var collections = _context.Collections.Include(c => c.blogs).ToList();
            return Ok(collections);
        }
        [HttpGet("{email}")]
        public IActionResult GetCollections(string email)
        {
            var collections = _context.Collections
                .Include(c => c.blogs)
                .Where(c => c.UserEmail == email)
                .ToList();
            return Ok(collections);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteCollection(int id)
        {
            // TODO: Implement the logic to delete the collection with the given ID from the database
            // Delete blogs with the matching collection ID
            // var blogs = _context.blogs.Where(f => f.CollectionId == id);
            // _context.blogs.RemoveRange(blogs);

            // Find the collection by id
            var collection = _context.Collections.Include(c => c.blogs).FirstOrDefault(c => c.Id == id);

            if (collection == null)
            {
                return NotFound(); // Collection not found
            }
            collection.blogs.ForEach(d => Console.WriteLine(d.Front));
            // Delete the associated blogs
            _context.blogs.RemoveRange(collection.blogs);
            _context.SaveChanges();
            _context.Collections.Remove(collection);
            _context.SaveChanges();


            return Ok(new
            {
                Status = 200,
                Message = "Collection Deleted!"
            });
        }
        // [HttpGet("{id}")]
        // public IActionResult GetCollectionById(int id)
        // {
        //     var collection = _context.Collections.Include(c => c.blogs).FirstOrDefault(c => c.Id == id);
        //     if (collection == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(collection);
        // }
        [HttpPost]
        public async Task<IActionResult> CreateCollection([FromBody] Collection collection)
        {
            if (collection == null)
                return BadRequest();

            // Add collection to the database
            await _context.Collections.AddAsync(collection);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Status = 200,
                Message = "Collection Added!"
            });
        }
    }
}