export const fileExists = async(filename: any): Promise<boolean> => {
    try {
        const stats = await Deno.lstat(filename);
        return stats && stats.isFile;
    } catch (error){
        if(error && error instanceof Deno.errors.NotFound){
            return false;
        } else {
            throw error;    
        }
    }
    
}