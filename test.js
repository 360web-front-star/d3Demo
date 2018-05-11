const svg = d3.select('body').append('svg').attr('width', '1080').attr('height', '600')
const width = svg.attr('width')
const height = svg.attr('height')

// 布局的大小
// size :布局的高， 布局的宽
const cluster2 = d3.layout.cluster()
  .size([height - 200, width - 800])
d3.json('data2.json', function (error, root) {
  if (error) {
    throw Error(error)
  }
  const nodes = cluster2.nodes(root)
  const links = cluster2.links(nodes)
  // 计算link的路径
  // 第一个调整上下， 第二个调整左右
  const diagonal = d3.svg.diagonal().projection((d) => {
    return [d.x + 100, d.y - 400]
  })
  // link位置
  const link = svg.selectAll('.link2')
    .data(links)
    .enter()
    .append('path')
    .attr('data-source_name', function (d) {
      return d.source.name
    })
    .attr('data-target_name', function (d) {
      return d.target.name
    })
    .attr('class', 'link')
    .attr('d', diagonal)
    .attr('transform', 'rotate(90)')
  console.log(link)
  // nodes位置
  const node = svg.selectAll('.node2')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node2')
    .attr('transform', function (d) {
      const translateX = d.y + 400 - d.depth * 300
      return `translate(${translateX}, ${d.x + 100})`
    })
    .on('mousemove', function (d) {
      d3.selectAll('.node-choosed2').attr('class', 'node2')
      d3.selectAll('.choosedLink2').attr('class', 'link')
      const parentNode = d
      if (d.depth === 0) {
        d3.selectAll('.link').attr('class', 'choosedLink2')
        d3.selectAll('.node2').attr('class', 'node2 node-choosed2')
      } else if (d.depth === 1) {
        d3.selectAll('.node2').filter(function (d, i) {
          if (!d.parent || d.parent.name === parentNode.name) {
            d3.select(this).attr('class', 'node2 node-choosed2')
          }
        })
        d3.select(this).attr('class', 'node2 node-choosed2')
        d3.selectAll(`[data-target_name='${d.name}']`).attr('class', 'choosedLink2')
        d3.selectAll(`[data-source_name='${d.name}']`).attr('class', 'choosedLink2')
      } else if (d.depth === 2) {
        d3.select(this).attr('class', 'node2 node-choosed2')
        d3.selectAll(`[data-target_name='${d.name}']`).attr('class', 'choosedLink2')
        d3.selectAll(`[data-target_name='${d.parent.name}']`).attr('class', 'choosedLink2')
      }
    })

  node.append('text')
    .attr('dx', function (d) { return d.children ? 8 : -8 })
    .attr('dy', 3)
    .style('text-anchor', function (d) { return d.children ? 'start' : 'end' })
    .text(function (d) { return d.name })
  node.append('circle')
    .attr('r', 4.5)
})

// 布局的大小
// size :布局的高， 布局的宽
const cluster = d3.layout.cluster()
  .size([height - 300, width - 800])
d3.json('data.json', function (error, root) {
  if (error) {
    throw Error(error)
  }
  const nodes = cluster.nodes(root)
  const links = cluster.links(nodes)
  // 计算link的路径
  // 第一个调整上下， 第二个调整左右
  const diagonal = d3.svg.diagonal()
    .projection(function (d) {
      return [d.y + 600, d.x + 300]
    })

  const link = svg.selectAll('.link1')
    .data(links)
    .enter()
    .append('path')
    .attr('data-source_name', function (d) {
      return `${d.source.name}1`
    })
    .attr('data-target_name', function (d) {
      return `${d.target.name}1`
    })
    .attr('class', 'link1')
    .attr('d', diagonal)
  const node = svg.selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      // 应该把这些协议当作一个整体，但我不知道该如何操作
      return `translate(${d.y + 600}, ${d.x + 300})`
    })
    .on('mousemove', function (d) {
      d3.selectAll('.node-choosed').attr('class', 'node')
      d3.selectAll('.choosedLink1').attr('class', 'link1')
      const parentNode = d
      if (d.depth === 0) {
        d3.selectAll('.node').attr('class', 'node node-choosed')
        d3.selectAll('.link1').attr('class', 'choosedLink1')
      } else if (d.depth === 1) {
        d3.selectAll('.node').filter(function (d, i) {
          if (!d.parent || d.parent.name === parentNode.name) {
            d3.select(this).attr('class', 'node node-choosed')
          }
        })
        d3.select(this).attr('class', 'node node-choosed')
        d3.selectAll(`[data-target_name='${d.name}1']`).attr('class', 'choosedLink1')
        d3.selectAll(`[data-source_name='${d.name}1']`).attr('class', 'choosedLink1')
      } else if (d.depth === 2) {
        d3.select(this).attr('class', 'node node-choosed')
        d3.selectAll(`[data-target_name='${d.name}1']`).attr('class', 'choosedLink1')
        d3.selectAll(`[data-target_name='${d.parent.name}1']`).attr('class', 'choosedLink1')
      }
    })
  console.log(link)
  node.append('circle')
    .attr('r', 4.5)

  node.append('text')
    .attr('dx', function (d) { return d.children ? -8 : 8 })
    .attr('dy', 3)
    .style('text-anchor', function (d) { return d.children ? 'end' : 'start' })
    .text(function (d) { return d.name })
})
