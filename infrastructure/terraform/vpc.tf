resource "aws_vpc" "discovery_engine" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "discovery-engine-vpc"
  }
}

resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.discovery_engine.id
  cidr_block        = "10.0.${count.index}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "discovery-engine-private-${count.index}"
  }
}

data "aws_availability_zones" "available" {}
