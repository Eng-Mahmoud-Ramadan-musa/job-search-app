var canJump = function(nums) {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    
    return true;
};

// Example usage:
console.log(canJump([2,3,1,1,4])); 
console.log(canJump([3,2,1,0,4])); 