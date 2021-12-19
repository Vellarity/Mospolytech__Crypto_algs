import random
import sys, json
from ec import ECPoint

class DSGOST:
    # p - int, EC module
    # a, b - int, EC coefficients
    # q - int, order of point P
    # p_x, p_y - int, point P coordinates
    def __init__(self, p, a, b, q, p_x, p_y):
        self.p_point = ECPoint(p_x, p_y, a, b, p)
        self.q = q
        self.a = a
        self.b = b
        self.p = p

    # generate key pair
    def gen_keys(self):
        d = random.randint(1, self.q - 1)
        q_point = d * self.p_point
        return d, q_point

    # sign message
    # message - int
    # private_key - int
    def sign(self, message, private_key, k=0):
        e = message % self.q
        if e == 0:
            e = 1
        if k == 0:
            k = random.randint(1, self.q - 1)
        r, s = 0, 0
        while r == 0 or s == 0:
            c_point = k * self.p_point
            r = c_point.x % self.q
            s = (r * private_key + k * e) % self.q
        return (r,s)

    # verify signed message
    # message - int
    # sign - tuple
    # public_key - ECPoint
    def verify(self, message, sign, public_key):
        e = message % self.q
        if e == 0:
            e = 1
        nu = ECPoint._mod_inverse(e, self.q)
        z1 = (sign[1] * nu) % self.q
        z2 = (-sign[0] * nu) % self.q
        c_point = z1 * self.p_point + z2 * public_key
        r = c_point.x % self.q
        if r == sign[0]:
            return True
        return False

def readIn():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    lines = readIn()
    type = lines.pop('type')
    if type == 'sign':
        for line in lines:
            lines[line] = int(lines[line])
        gost = DSGOST(lines['p'],lines['a'], lines['b'], lines['q'], lines['x'], lines['y'])
        sign = gost.sign(lines['message'], lines['key'], lines['k'])
        print (sign)
        pub_key = ECPoint(lines['q_x'], lines['q_y'], lines['a'], lines['b'], lines['p'])
        is_signed = gost.verify(lines['message'], sign, pub_key)
        print (is_signed)

if __name__ == '__main__':
    main()
