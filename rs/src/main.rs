fn main() {
    println!(":?{}", power(21, 15, 47));
}


fn power(a:i128, b:u32, modd:i128) -> i128{
    let pwr:i128 = a.pow(b) % modd;

    return pwr
}